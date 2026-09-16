// backend/services/rfqService.js
import QuoteInquiry from '../models/QuoteInquiry.js';
import { isDbConnected } from '../config/db.js';

/**
 * Saves a new RFQ inquiry to MongoDB if the database is connected
 * @param {Object} rfqData - Sanitized inquiry data
 * @param {Array} files - Multer uploaded files array
 * @param {Object} meta - Client metadata (IP, userAgent)
 * @returns {Promise<Object|null>} Saved database document or null if DB offline
 */
export async function saveQuoteInquiry(rfqData, files = [], meta = {}) {
  if (!isDbConnected()) {
    console.log('ℹ️ [RFQ Service] MongoDB is offline or not configured. Skipping database record persistence.');
    return null;
  }

  const fileAttachments = (files || []).map((file) => ({
    originalName: file.originalname,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    uploadDate: new Date()
  }));

  const inquiryDoc = new QuoteInquiry({
    name: rfqData.name,
    company: rfqData.company,
    email: rfqData.email,
    phone: rfqData.phone || 'Not provided',
    category: rfqData.category,
    quantity: rfqData.quantity,
    timeline: rfqData.timeline,
    budget: rfqData.budget || 'Not specified',
    description: rfqData.description,
    files: fileAttachments,
    ipAddress: meta.ipAddress || null,
    userAgent: meta.userAgent || null,
    status: 'pending'
  });

  const saved = await inquiryDoc.save();
  console.log(`💾 [RFQ Service] Quote inquiry saved to MongoDB with ID: ${saved._id}`);
  return saved;
}

/**
 * Updates an inquiry document with email dispatch status
 * @param {string} inquiryId 
 * @param {string} messageId 
 */
export async function markEmailDispatched(inquiryId, messageId) {
  if (!isDbConnected() || !inquiryId) return;

  try {
    await QuoteInquiry.findByIdAndUpdate(inquiryId, {
      emailDispatched: true,
      emailMessageId: messageId
    });
  } catch (err) {
    console.warn(`[RFQ Service] Could not update email status for inquiry ${inquiryId}:`, err.message);
  }
}
