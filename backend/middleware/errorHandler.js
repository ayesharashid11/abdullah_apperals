// backend/middleware/errorHandler.js
import multer from 'multer';
import { cleanupTempFiles } from './upload.js';

export function errorHandler(err, req, res, next) {
  console.error('🔥 [Server Error Handler]:', err.message || err);

  // Clean up any files that were partially uploaded
  if (req.files && req.files.length > 0) {
    cleanupTempFiles(req.files).catch(console.error);
  }

  // Handle Multer specific errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds the 10MB limit per file.',
        errors: { files: 'Each file must be under 10MB.' }
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Maximum 3 files are allowed per submission.',
        errors: { files: 'You can upload up to 3 files.' }
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'Unexpected file upload field.',
        errors: { files: 'Invalid upload parameter.' }
      });
    }
  }

  // Handle custom upload filter errors
  if (err.message && err.message.includes('Unsupported file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: { files: err.message }
    });
  }

  // Generic sanitized server error (never leak stack traces or internal secrets)
  const statusCode = err.status || err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: 'We could not submit your request. Please try again.'
  });
}
