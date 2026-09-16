// backend/controllers/rfqController.js
import { sendInternalRfqEmail, sendCustomerConfirmationEmail } from '../services/mailService.js';
import { saveQuoteInquiry, markEmailDispatched } from '../services/rfqService.js';
import { cleanupTempFiles } from '../middleware/upload.js';

/**
 * Handles RFQ submission:
 * 1. Saves inquiry document to MongoDB with file metadata
 * 2. Dispatches internal notification email with tech pack attachments to company desk
 * 3. Dispatches customer confirmation auto-reply
 * 4. Cleans up temporary uploaded files safely
 * 5. Returns standardized JSON response
 */
export async function handleRfqSubmission(req, res, next) {
  const rfqData = req.sanitizedRfq;
  const files = req.files || [];

  const meta = {
    ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip,
    userAgent: req.headers['user-agent'] || ''
  };

  try {

    // 1. Save to MongoDB
    let savedInquiry = null;
    try {
      savedInquiry = await saveQuoteInquiry(rfqData, files, meta);
    } catch (dbErr) {
      console.error('⚠️ [RFQ Controller] MongoDB save notice:', dbErr.message);
    }

    // 2. Send internal RFQ email to company mailbox with file attachments
    let emailInfo = null;
    try {
      emailInfo = await sendInternalRfqEmail(rfqData, files);
      if (savedInquiry && emailInfo?.messageId) {
        await markEmailDispatched(savedInquiry._id, emailInfo.messageId);
      }
    } catch (mailErr) {
      console.error('⚠️ [RFQ Controller Error] Internal email dispatch failed:', mailErr.message);
    }

    // 3. Send confirmation email to customer
    try {
      await sendCustomerConfirmationEmail(rfqData);
    } catch (confErr) {
      console.warn('⚠️ [RFQ Controller] Customer confirmation email warning:', confErr.message);
    }

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: 'Your request has been submitted successfully.',
      inquiryId: savedInquiry?._id || null
    });
  } catch (error) {
    console.error('❌ [RFQ Controller Error] RFQ submission error:', error.message || error);
    return res.status(500).json({
      success: false,
      message: 'We could not submit your request. Please try again.'
    });
  } finally {
    // 5. Ensure all temporary uploaded files are deleted from server storage
    if (files.length > 0) {
      await cleanupTempFiles(files);
      console.log(`🧹 [RFQ Controller] Cleaned up ${files.length} temporary upload file(s).`);
    }
  }
}
