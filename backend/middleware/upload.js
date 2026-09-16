// backend/middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Configure temporary upload directory
const uploadDir = path.join(os.tmpdir(), 'stitchworks-rfq-uploads');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique sanitized filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitizedOriginal = (file.originalname || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}-${sanitizedOriginal}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExts = ['.pdf', '.png', '.jpg', '.jpeg', '.ai'];
  const ext = path.extname(file.originalname || '').toLowerCase();
  
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${ext || 'unknown'}. Allowed: PDF, PNG, JPG, JPEG, AI`), false);
  }
};

export const uploadRfqFiles = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 3 // Max 3 files
  }
}).array('files', 3);

/**
 * Utility to clean up temporary uploaded files safely
 * @param {Array} files 
 */
export async function cleanupTempFiles(files = []) {
  if (!files || !Array.isArray(files)) return;
  for (const file of files) {
    if (file && file.path) {
      try {
        if (fs.existsSync(file.path)) {
          await fs.promises.unlink(file.path);
        }
      } catch (err) {
        try {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        } catch (fallbackErr) {
          console.warn(`[Cleanup Warning] Could not delete temp file ${file.path}:`, err.message);
        }
      }
    }
  }
}
