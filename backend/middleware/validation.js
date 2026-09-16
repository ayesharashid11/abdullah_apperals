// backend/middleware/validation.js
import { validateRfqData, validateFiles } from '../utils/validators.js';
import { cleanupTempFiles } from './upload.js';

export function rfqValidationMiddleware(req, res, next) {
  // Validate text fields
  const { isValid, errors, sanitized } = validateRfqData(req.body);

  if (!isValid) {
    // If validation fails, immediately clean up any temporary uploaded files
    if (req.files && req.files.length > 0) {
      cleanupTempFiles(req.files).catch(console.error);
    }

    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields.',
      errors
    });
  }

  // Validate uploaded files
  const fileValidation = validateFiles(req.files || []);
  if (!fileValidation.isValid) {
    if (req.files && req.files.length > 0) {
      cleanupTempFiles(req.files).catch(console.error);
    }

    return res.status(400).json({
      success: false,
      message: fileValidation.error,
      errors: {
        files: fileValidation.error
      }
    });
  }

  // Attach sanitized fields to req
  req.sanitizedRfq = sanitized;
  next();
}
