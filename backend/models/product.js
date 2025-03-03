const db = require('../config/database');
const ActivityLog = require('./ActivityLog');

class Product {
  static async createProduct(productData, adminId) {
    const { name, description, images, url, category, price } = productData;
    const query = `
      INSERT INTO products (name, description, images, url, category, price, admin_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params = [name, description, JSON.stringify(images), url, category, price, adminId];

    try {
      const [result] = await db.promise().query(query, params);
      const newProduct = { id: result.insertId, ...productData, admin_id: adminId };
      await ActivityLog.log(adminId, 'CREATE_PRODUCT', { product_id: newProduct.id, product_name: newProduct.name });
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  static async getProductById(id) {
    const query = `
      SELECT p.*, u.username as admin_username
      FROM products p
      LEFT JOIN users u ON p.admin_id = u.id
      WHERE p.id = ?
    `;

    try {
      const [results] = await db.promise().query(query, [id]);
      if (results.length > 0) {
        results[0].images = JSON.parse(results[0].images);
      }
      return results[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  static async updateProduct(id, updateData, adminId) {
    const { name, description, images, url, category, price } = updateData;
    const query = `
      UPDATE products
      SET name = ?, description = ?, images = ?, url = ?, category = ?, price = ?,
      admin_id = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const params = [name, description, JSON.stringify(images), url, category, price, adminId, id];

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

    const countQuery = query.replace('SELECT p.*, u.username as admin_username', 'SELECT COUNT(*) as total');
    const [countResult] = await db.promise().query(countQuery, params);
    const totalCount = countResult[0].total;

    query += ` ORDER BY ${sortBy} ${sortOrder}`;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    try {
      const [results] = await db.promise().query(query, params);
      results.forEach(product => {
        product.images = JSON.parse(product.images);
      });
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
      products.forEach(product => {
        product.images = JSON.parse(product.images);
      });
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
