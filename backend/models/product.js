const db = require('../config/database');
const ActivityLog = require('./ActivityLog');

class Product {
  /**
   * Create a new product
   * @param {Object} productData - The product data
   * @param {number} adminId - The ID of the admin creating the product
   * @returns {Promise<Object>} The created product
   */
  static async createProduct(productData, adminId) {
    const { name, description, image, url, category, price } = productData;
    const query = `
      INSERT INTO products (name, description, image, url, category, price, admin_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params = [name, description, image, url, category, price, adminId];

    try {
      const [result] = await db.promise().query(query, params);
      const newProduct = { id: result.insertId, ...productData, admin_id: adminId };
      
      // Log activity
      await ActivityLog.log(adminId, 'CREATE_PRODUCT', { product_id: newProduct.id, product_name: newProduct.name });
      
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  /**
   * Get a product by its ID
   * @param {number} id - The product ID
   * @returns {Promise<Object|null>} The product or null if not found
   */
  static async getProductById(id) {
    const query = `
      SELECT p.*, u.username as admin_username
      FROM products p
      LEFT JOIN users u ON p.admin_id = u.id
      WHERE p.id = ?
    `;
    try {
      const [results] = await db.promise().query(query, [id]);
      return results[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Update a product
   * @param {number} id - The product ID
   * @param {Object} updateData - The data to update
   * @param {number} adminId - The ID of the admin updating the product
   * @returns {Promise<boolean>} True if updated successfully
   */
  static async updateProduct(id, updateData, adminId) {
    const { name, description, image, url, category, price } = updateData;
    const query = `
      UPDATE products
      SET name = ?, description = ?, image = ?, url = ?, category = ?, price = ?, 
          admin_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [name, description, image, url, category, price, adminId, id];

    try {
      const [result] = await db.promise().query(query, params);
      if (result.affectedRows > 0) {
        await ActivityLog.log(adminId, 'UPDATE_PRODUCT', { product_id: id, product_name: name });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  /**
   * Delete a product
   * @param {number} id - The product ID
   * @param {number} adminId - The ID of the admin deleting the product
   * @returns {Promise<boolean>} True if deleted successfully
   */
  static async deleteProduct(id, adminId) {
    const query = 'DELETE FROM products WHERE id = ?';
    try {
      const [result] = await db.promise().query(query, [id]);
      if (result.affectedRows > 0) {
        await ActivityLog.log(adminId, 'DELETE_PRODUCT', { product_id: id });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  /**
   * Get all products with optional filtering and pagination
   * @param {Object} options - Filter and pagination options
   * @returns {Promise<Object>} Object containing products and total count
   */
  static async getAllProducts(options = {}) {
    const {
      search = '',
      category = '',
      minPrice = 0,
      maxPrice = Number.MAX_SAFE_INTEGER,
      sortBy = 'created_at',
      sortOrder = 'DESC',
      page = 1,
      limit = 10
    } = options;

    let query = `
      SELECT p.*, u.username as admin_username
      FROM products p
      LEFT JOIN users u ON p.admin_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      query += ' AND p.category = ?';
      params.push(category);
    }
    query += ' AND p.price BETWEEN ? AND ?';
    params.push(minPrice, maxPrice);

    // Count total results for pagination
    const countQuery = query.replace('SELECT p.*, u.username as admin_username', 'SELECT COUNT(*) as total');
    const [countResult] = await db.promise().query(countQuery, params);
    const totalCount = countResult[0].total;

    // Add sorting and pagination
    query += ` ORDER BY ${sortBy} ${sortOrder}`;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    try {
      const [results] = await db.promise().query(query, params);
      return {
        products: results,
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit)
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get products by admin
   * @param {number} adminId - The ID of the admin
   * @param {Object} options - Pagination options
   * @returns {Promise<Object>} Object containing products and total count
   */
  static async getProductsByAdmin(adminId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const query = `
      SELECT * FROM products
      WHERE admin_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    const countQuery = 'SELECT COUNT(*) as total FROM products WHERE admin_id = ?';

    try {
      const [[{ total }]] = await db.promise().query(countQuery, [adminId]);
      const [products] = await db.promise().query(query, [adminId, limit, (page - 1) * limit]);

      return {
        products,
        totalCount: total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error fetching products by admin:', error);
      throw new Error('Failed to fetch products by admin');
    }
  }
}

module.exports = Product;
