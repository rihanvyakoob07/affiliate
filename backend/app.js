// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const productRoutes = require('./routes/productroutes');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
// const { authMiddleware } = require('./middleware/auth');
// const { ActivityLog } = require('./models/ActivityLog');
// const helmet = require('helmet');

// // Initialize express
// const app = express();

// // Swagger configuration
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Affiliate API',
//       version: '1.0.0',
//       description: 'API documentation for the Affiliate marketing platform'
//     },
//     servers: [
//       {
//         url: process.env.API_URL || 'http://localhost:3001',
//         description: 'API Server'
//       }
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT'
//         }
//       }
//     },
//     security: [
//       {
//         bearerAuth: []
//       }
//     ]
//   },
//   apis: ['./routes/*.js', './middleware/*.js', './models/*.js']
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// // Use Helmet for security headers
// app.use(helmet());

// // Configure CORS
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// // Routes
// app.use('/api', authMiddleware);
// app.use('/api/products', productRoutes);
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Activity logging middleware
// app.use(async (req, res, next) => {
//   res.on('finish', () => {
//     if (req.user) {
//       ActivityLog.log(req.user.id, req.method, {
//         path: req.path,
//         statusCode: res.statusCode
//       });
//     }
//   });
//   next();
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: err.message || 'Something went wrong!' });
// });

// // Handle 404
// app.use((req, res) => {
//   res.status(404).json({ error: 'Not found' });
// });

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;



const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productroutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { authMiddleware } = require('./middleware/auth');
const ActivityLog = require('./models/ActivityLog');
const helmet = require('helmet');
const User = require('./models/User');
const SessionHistory = require('./models/SessionHistory');

// Initialize express
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Affiliate API',
      version: '1.0.0',
      description: 'API documentation for the Affiliate marketing platform'
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:3001',
        description: 'API Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './middleware/*.js', './models/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use Helmet for security headers
app.use(helmet());

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

// Login route - no authentication required
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const authResult = await User.authenticateUser(email, password);
    
    if (!authResult) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Log successful login
    await ActivityLog.log(authResult.user.id, 'LOGIN', { 
      email: authResult.user.email 
    });
    
    // Record session
    const sessionId = await SessionHistory.logLogin(
      authResult.user.id, 
      req.ip
    );
    
    res.json({
      ...authResult,
      sessionId
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Token generation endpoint - requires authentication
app.post('/api/auth/generate-token', authMiddleware, async (req, res) => {
  try {
    const { userId, username, role } = req.body;
    
    // Only admins can generate tokens for other users
    if (userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can generate tokens for other users' });
    }
    
    // Generate new token
    const token = User.generateToken(userId, username, role);
    
    // Log the token generation
    await ActivityLog.log(req.user.id, 'GENERATE_TOKEN', { 
      target_user_id: userId 
    });
    
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Protected routes
app.use('/api/products', authMiddleware, productRoutes);

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Activity logging middleware
app.use(async (req, res, next) => {
  res.on('finish', () => {
    if (req.user) {
      ActivityLog.log(req.user.id, req.method, {
        path: req.path,
        statusCode: res.statusCode
      });
    }
  });
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

