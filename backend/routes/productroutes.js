const express = require('express');
const db = require('../config/database');
const upload = require('./../config/MulterConfig');
const { deleteFile, getDefaultImage } = require('../utils/fileUtils');
const ActivityLog = require('../models/ActivityLog');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Fetch all products with optional filters
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
 *         description: Filter by product category
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (search || category) {
      query += ' WHERE';
      if (search) {
        query += ' name LIKE ?';
        params.push(`%${search}%`);
      }
      if (category) {
        query += search ? ' AND' : '';
        query += ' category = ?';
        params.push(category);
      }
    }

    const [results] = await db.promise().query(query, params);
    res.json(results.map(product => ({
      ...product,
      image: product.image || getDefaultImage()
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

/**
 * @swagger
 * /api/upload-multiple:
 *   post:
 *     summary: Upload multiple images
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 */
router.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filesInfo = req.files.map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({ message: 'Images uploaded successfully!', files: filesInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading files' });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product with optional image upload
 *     requestBody:
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
 */
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, url, category, price } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const admin_id = req.user.id; // Assuming you have authentication middleware that sets req.user

    if (!name) throw new Error('Product name is required');

    const productData = { name, description, image: imagePath, url, category, price };
    const newProduct = await Product.createProduct(productData, admin_id);

    // Log the activity
    await ActivityLog.log(admin_id, 'CREATE_PRODUCT', {
      product_id: newProduct.id,
      product_name: newProduct.name
    });

    res.status(201).json({
      ...newProduct,
      image: newProduct.image || getDefaultImage()
    });
  } catch (err) {
    console.error(err);
    if (req.file) deleteFile(`/uploads/${req.file.filename}`);
    res.status(500).json({ error: err.message || 'Failed to create product' });
  }
});



module.exports = router;
