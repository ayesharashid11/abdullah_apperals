// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { connectDB, isDbConnected } from './backend/config/db.js';
import rfqRouter from './backend/routes/rfq.js';
import { errorHandler } from './backend/middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function bootstrap() {
  const app = express();
  const PORT = 3000;

  // Initialize MongoDB Connection (non-blocking)
  await connectDB().catch((err) => {
    console.warn('⚠️ [Server Boot] MongoDB initialization deferred:', err.message);
  });

  // 1. Security Headers via Helmet
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabled for flexible embedding & Vite dev script execution
      crossOriginEmbedderPolicy: false
    })
  );

  // 2. CORS configuration
  const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL]
    : true; // Allow same-origin or preview iframe requests

  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    })
  );

  // 3. Body parsers
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // 4. Rate Limiting for RFQ endpoint
  const rfqLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 RFQ submissions per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many RFQ requests from this IP address. Please try again after 15 minutes.'
    }
  });

  // 5. API Routes
  app.use('/api/rfq', rfqLimiter, rfqRouter);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Abdullah Apparels Networks RFQ Gateway',
      database: isDbConnected() ? 'connected' : 'standby',
      timestamp: new Date().toISOString()
    });
  });

  // 6. Vite / Static Frontend Middleware
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 7. Centralized Error Handler (must be after routes)
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🚀 Abdullah Apparels Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Fatal Server Boot Error:', err);
  process.exit(1);
});
