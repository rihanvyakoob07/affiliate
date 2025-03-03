// models/AffiliateLink.js
const db = require('../config/database');

class AffiliateLink {
  static createLink(data) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO affiliate_links (product_id, platform, link, commission_rate) VALUES (?, ?, ?, ?)',
        [data.product_id, data.platform, data.link, data.commission_rate],
        (err, result) => {
          if (err) reject(err);
          resolve({ id: result.insertId, ...data });
        }
      );
    });
  }

  static getLinks(platform = '') {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM affiliate_links WHERE 1=1';
      const params = [];

      if (platform) {
        query += ' AND platform = ?';
        params.push(platform);
      }

      db.query(query, params, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = AffiliateLink;