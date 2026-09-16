// backend/routes/rfq.js
import express from 'express';
import { uploadRfqFiles } from '../middleware/upload.js';
import { rfqValidationMiddleware } from '../middleware/validation.js';
import { handleRfqSubmission } from '../controllers/rfqController.js';

const router = express.Router();

// POST /api/rfq - Processes multipart/form-data RFQ submissions
router.post(
  '/',
  uploadRfqFiles,
  rfqValidationMiddleware,
  handleRfqSubmission
);

// GET /api/rfq - Quick health check / metadata
router.get('/', (req, res) => {
  res.json({
    endpoint: '/api/rfq',
    status: 'online',
    acceptedFormats: ['multipart/form-data'],
    fileLimits: {
      maxFiles: 3,
      maxSizePerFile: '10MB',
      allowedTypes: ['PDF', 'PNG', 'JPG', 'JPEG', 'AI']
    }
  });
});

export default router;
