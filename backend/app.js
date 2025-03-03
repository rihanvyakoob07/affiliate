const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productroutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authMiddleware = require('./middleware/auth');
// Initialize express
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Affiliate API',
      version: '1.0.0'
    }
  },
  apis: ['./routes/*.js'] // Adjust this path based on where you add your Swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Configure CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
// Apply auth middleware to protected routes
app.use('/api', authMiddleware);
app.use('/api', productRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;