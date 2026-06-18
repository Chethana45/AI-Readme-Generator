import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzerRoutes from './routes/analyzerRoutes.js';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Mount analyzer routes
app.use("/api", analyzerRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[Server Error]: ${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred on the server',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});