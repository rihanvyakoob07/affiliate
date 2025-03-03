const fs = require('fs');
const path = require('path');

// Delete a file from the server
const deleteFile = (filePath) => {
  if (!filePath) return;
  const fullPath = path.join(__dirname, '../public', filePath);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
};

// Get default placeholder image path for products without an image
const getDefaultImage = () => '/uploads/default.jpg';

module.exports = { deleteFile, getDefaultImage };
