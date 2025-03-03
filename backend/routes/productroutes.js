const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const ActivityLog = require('../models/ActivityLog');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../config/MulterConfig');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         description:
 *           type: string
 *           description: The product description
 *         price:
 *           type: number
 *           description: The product price
 *         category:
 *           type: string
 *           description: The product category
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         url:
 *           type: string
 *           description: Product URL
 *         admin_id:
 *           type: integer
 *           description: ID of the admin who created the product
 *         admin_username:
 *           type: string
 *           description: Username of the admin who created the product
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for product name or description
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [created_at, name, price]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not admin
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
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
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               url:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: The product was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not admin
 *       404:
 *         description: The product was not found
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not admin
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server error
 */

// Create a product
router.post('/', authMiddleware, adminMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    // Extract product data from request body
    const { name, description, price, category, url } = req.body;
    
    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required fields' });
    }
    
    // Process uploaded images
    const images = req.files.map(file => `/uploads/${file.filename}`);
    
    // Create product in database
    const product = await Product.createProduct({
      name,
      description,
      price: parseFloat(price),
      category,
      url,
      images
    }, req.user.id);

    // Return created product
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    // Extract query parameters
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.query;
    
    // Get products with options
    const products = await Product.getAllProducts({
      search,
      category,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy,
      sortOrder,
      page: page ? parseInt(page) : undefined,
      limit: limit ? parseInt(limit) : undefined
    });
    
    // Return products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Validate ID
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Get product from database
    const product = await Product.getProductById(productId);
    
    // Check if product exists
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Return product
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a product
router.put('/:id', authMiddleware, adminMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Extract product data from request body
    const { name, description, price, category, url } = req.body;
    
    // Process uploaded images if any
    const newImages = req.files && req.files.length > 0 
      ? req.files.map(file => `/uploads/${file.filename}`) 
      : undefined;
    
    // Update product in database
    const updated = await Product.updateProduct(productId, {
      name,
      description,
      price: price ? parseFloat(price) : undefined,
      category,
      url,
      images: newImages
    }, req.user.id);

    // Check if product was found and updated
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Return success message
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a product
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Delete product from database
    const deleted = await Product.deleteProduct(productId, req.user.id);
    
    // Check if product was found and deleted
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Return success message
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
