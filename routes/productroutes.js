const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/database');

// Configure upload directory
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure default image
const defaultImagePath = path.join(__dirname, '../public/uploads/default.jpg');
if (!fs.existsSync(defaultImagePath)) {
  const sourceImage = path.join(__dirname, '../assets/default.jpg');
  if (fs.existsSync(sourceImage)) {
    fs.copyFileSync(sourceImage, defaultImagePath);
  }
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed!'));
  }
});

// Helper function to delete old image
const deleteOldImage = (imagePath) => {
  if (!imagePath) return;
  const fullPath = path.join(__dirname, '../public', imagePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// Helper function to get default image
const getDefaultImage = () => '/uploads/default.jpg';

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve all products with optional search and category filtering.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filter products by name.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category.
 *     responses:
 *       200:
 *         description: List of products returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error.
 */
router.get('/products', (req, res) => {
  const { search, category } = req.query;
  let query = 'SELECT * FROM products';
  const queryParams = [];

  if (search || category) {
    query += ' WHERE';
    if (search) {
      query += ' name LIKE ?';
      queryParams.push(`%${search}%`);
    }
    if (category) {
      if (search) query += ' AND';
      query += ' category = ?';
      queryParams.push(category);
    }
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
    // Set default image for products without images
    results = results.map(product => ({
      ...product,
      image: product.image || getDefaultImage()
    }));
    res.json(results);
  });
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a single product
 *     description: Get a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const product = results[0];
    product.image = product.image || getDefaultImage();
    res.json(product);
  });
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with optional image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error.
 */
router.post('/products', upload.single('image'), (req, res) => {
  try {
    const { name, description, url, category, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name) {
      if (image) deleteOldImage(image);
      return res.status(400).json({ error: 'Product name is required' });
    }

    const insertQuery = `
      INSERT INTO products (name, description, image, url, category, price)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      insertQuery,
      [name, description, image, url, category, price],
      (err, result) => {
        if (err) {
          if (image) deleteOldImage(image);
          console.error('Error creating product:', err);
          return res.status(500).json({ error: 'Failed to create product' });
        }

        res.status(201).json({
          id: result.insertId,
          name,
          description,
          image: image || getDefaultImage(),
          url,
          category,
          price,
        });
      }
    );
  } catch (error) {
    console.error('Error in product creation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product with an optional new image upload.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.put('/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, url, price, category } = req.body;
  
  if (!name) {
    if (req.file) deleteOldImage(`/uploads/${req.file.filename}`);
    return res.status(400).json({ error: 'Product name is required' });
  }

  try {
    db.query('SELECT image FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        if (req.file) deleteOldImage(`/uploads/${req.file.filename}`);
        return res.status(500).json({ error: 'Failed to update product' });
      }

      if (results.length === 0) {
        if (req.file) deleteOldImage(`/uploads/${req.file.filename}`);
        return res.status(404).json({ error: 'Product not found' });
      }

      const oldImage = results[0].image;
      const newImage = req.file ? `/uploads/${req.file.filename}` : oldImage;

      const updateQuery = `
        UPDATE products 
        SET name = ?, description = ?, image = ?, url = ?, price = ?, category = ?
        WHERE id = ?
      `;
      db.query(
        updateQuery,
        [name, description, newImage, url, price, category, id],
        (err, result) => {
          if (err) {
            if (req.file) deleteOldImage(newImage);
            console.error('Error updating product:', err);
            return res.status(500).json({ error: 'Failed to update product' });
          }

          if (req.file && oldImage) {
            deleteOldImage(oldImage);
          }
          res.json({
            id,
            name,
            description,
            image: newImage || getDefaultImage(),
            url,
            price,
            category
          });
        }
      );
    });
  } catch (error) {
    console.error('Error in product update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product and its associated image.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  try {
    db.query('SELECT image FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching product image:', err);
        return res.status(500).json({ error: 'Failed to delete product' });
      }

      const imagePath = results[0]?.image;
      db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error deleting product:', err);
          return res.status(500).json({ error: 'Failed to delete product' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        if (imagePath) {
          deleteOldImage(imagePath);
        }
        res.json({ message: 'Product deleted successfully', id });
      });
    });
  } catch (error) {
    console.error('Error in product deletion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/product/read:
 *   get:
 *     summary: Read a product by query parameter
 *     description: Retrieve a product by providing its ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Product id is required.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error.
 */
router.get('/product/read', (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Product id is required' });
  }
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = results[0];
    product.image = product.image || getDefaultImage();
    res.json(product);
  });
});

module.exports = router;

/*

    The endpoints defined in this file provide complete CRUD operations for products.
    
    Endpoints:
      - GET /api/products
          Retrieves a list of all products.
          Supports optional query parameters:
              • search   : Filter products by name.
              • category : Filter products by category.
      
      - GET /api/products/:id
          Retrieves the details of a single product by its ID.
      
      - POST /api/products
          Creates a new product.
          Supports a multipart/form-data request including an optional image upload.
          Required field: name
      
      - PUT /api/products/:id
          Updates an existing product.
          Supports a multipart/form-data request including an optional image upload.
          Required field: name
      
      - DELETE /api/products/:id
          Deletes a product by its ID along with its associated image.
      
      - GET /api/product/read?id={id}
          Retrieves a product by passing its ID as a query parameter.
    
    Image Uploads:
      • Only jpg, jpeg, png, or gif files are allowed.
      • Maximum file size is 5MB.
      • If no image is provided, a default image is used.
*/