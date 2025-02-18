const db = require('../config/database');

class Product {
  static getAllProducts(search = '', category = '') {
    return new Promise((resolve, reject) => {
      let query = 'SELECT id, name, thumbnail, price FROM products WHERE 1=1';
      const params = [];

      if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }

      if (category) {
        query += ' AND category = ?';
        params.push(category);
      }

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getProductById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT id, name, description, image, price, affiliate_link FROM products WHERE id = ?',
        [id],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });
  }
}

module.exports = Product;