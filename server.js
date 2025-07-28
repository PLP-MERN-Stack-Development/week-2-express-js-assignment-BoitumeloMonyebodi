import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});