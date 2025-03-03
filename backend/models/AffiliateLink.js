const db = require('../config/database');

class AffiliateLink {
  /**
   * Create a new affiliate link.
   * @param {Object} data - The affiliate link data.
   * @param {number} data.product_id - The ID of the associated product.
   * @param {string} data.platform - The platform name (e.g., Amazon, eBay).
   * @param {string} data.link - The affiliate link URL.
   * @param {number} data.commission_rate - The commission rate for the link.
   * @returns {Promise<Object>} The created affiliate link with its ID.
   */
  static async createLink(data) {
    const query = `
      INSERT INTO affiliate_links (product_id, platform, link, commission_rate)
      VALUES (?, ?, ?, ?)
    `;
    const params = [data.product_id, data.platform, data.link, data.commission_rate];

    try {
      const [result] = await db.promise().query(query, params);
      return { id: result.insertId, ...data };
    } catch (error) {
      console.error('Error creating affiliate link:', error.message);
      throw new Error('Failed to create affiliate link');
    }
  }

  /**
   * Retrieve all affiliate links with optional filtering by platform.
   * @param {string} [platform] - Optional platform name to filter the links.
   * @returns {Promise<Array>} A list of affiliate links.
   */
  static async getLinks(platform = '') {
    let query = 'SELECT * FROM affiliate_links WHERE 1=1';
    const params = [];

    if (platform) {
      query += ' AND platform = ?';
      params.push(platform);
    }

    try {
      const [results] = await db.promise().query(query, params);
      return results;
    } catch (error) {
      console.error('Error fetching affiliate links:', error.message);
      throw new Error('Failed to fetch affiliate links');
    }
  }

  /**
   * Retrieve an affiliate link by its ID.
   * @param {number} id - The ID of the affiliate link.
   * @returns {Promise<Object|null>} The affiliate link or null if not found.
   */
  static async getLinkById(id) {
    const query = 'SELECT * FROM affiliate_links WHERE id = ?';

    try {
      const [results] = await db.promise().query(query, [id]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Error fetching affiliate link by ID:', error.message);
      throw new Error('Failed to fetch affiliate link');
    }
  }

  /**
   * Update an existing affiliate link by its ID.
   * @param {number} id - The ID of the affiliate link to update.
   * @param {Object} data - The updated data for the affiliate link.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  static async updateLink(id, data) {
    const query = `
      UPDATE affiliate_links
      SET product_id = ?, platform = ?, link = ?, commission_rate = ?
      WHERE id = ?
    `;
    const params = [data.product_id, data.platform, data.link, data.commission_rate, id];

    try {
      const [result] = await db.promise().query(query, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating affiliate link:', error.message);
      throw new Error('Failed to update affiliate link');
    }
  }

  /**
   * Delete an affiliate link by its ID.
   * @param {number} id - The ID of the affiliate link to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  static async deleteLink(id) {
    const query = 'DELETE FROM affiliate_links WHERE id = ?';

    try {
      const [result] = await db.promise().query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting affiliate link:', error.message);
      throw new Error('Failed to delete affiliate link');
    }
  }
}

module.exports = AffiliateLink;
