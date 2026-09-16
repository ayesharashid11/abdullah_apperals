// backend/models/QuoteInquiry.js
import mongoose from 'mongoose';

const FileAttachmentSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const QuoteInquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters'],
    maxlength: [120, 'Company name cannot exceed 120 characters']
  },
  email: {
    type: String,
    required: [true, 'Work email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid work email address']
  },
  phone: {
    type: String,
    trim: true,
    default: 'Not provided'
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    lowercase: true,
    enum: {
      values: [
        'knitwear',
        'outerwear',
        'cut-and-sew',
        'activewear',
        'accessories',
        'tailored-wovens',
        'custom'
      ],
      message: '{VALUE} is not a supported manufacturing category'
    }
  },
  quantity: {
    type: String,
    required: [true, 'Quantity tier is required'],
    trim: true
  },
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    trim: true
  },
  budget: {
    type: String,
    trim: true,
    default: 'Not specified'
  },
  description: {
    type: String,
    required: [true, 'Project description or technical requirements are required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [4000, 'Description cannot exceed 4000 characters']
  },
  files: [FileAttachmentSchema],
  status: {
    type: String,
    enum: ['pending', 'under_review', 'quoted', 'archived'],
    default: 'pending'
  },
  emailDispatched: {
    type: Boolean,
    default: false
  },
  emailMessageId: {
    type: String,
    default: null
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for high-performance sorting and querying
QuoteInquirySchema.index({ createdAt: -1 });
QuoteInquirySchema.index({ email: 1 });
QuoteInquirySchema.index({ company: 1 });
QuoteInquirySchema.index({ status: 1 });

const QuoteInquiry = mongoose.models.QuoteInquiry || mongoose.model('QuoteInquiry', QuoteInquirySchema);

export default QuoteInquiry;
