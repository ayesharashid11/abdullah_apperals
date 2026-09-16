// backend/utils/validators.js

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

export const ALLOWED_CATEGORIES = [
  'knitwear',
  'outerwear',
  'cut-and-sew',
  'activewear',
  'accessories',
  'tailored-wovens',
  'custom'
];

export const ALLOWED_QUANTITIES = [
  '100-500',
  '500-2k',
  '500-2000',
  '2k-5k',
  '2000-5000',
  '5k+',
  '5000+'
];

export const ALLOWED_TIMELINES = [
  '< 4 Weeks',
  '4-8 Weeks',
  '8-12 Weeks',
  'Flexible',
  'urgent',
  'standard',
  'flexible'
];

/**
 * Validates the RFQ form fields server-side
 * @param {Object} body - Request body containing form fields
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateRfqData(body = {}) {
  const errors = {};

  // Name (Required)
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length < 2 || name.length > 100) {
    errors.name = 'Name must be between 2 and 100 characters.';
  }

  // Company (Required)
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  if (!company) {
    errors.company = 'Company name is required.';
  } else if (company.length < 2 || company.length > 120) {
    errors.company = 'Company name must be between 2 and 120 characters.';
  }

  // Email (Required & Valid format)
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  if (!email) {
    errors.email = 'Work email is required.';
  } else if (!EMAIL_REGEX.test(email) || email.length > 150) {
    errors.email = 'Please provide a valid email address.';
  }

  // Phone (Optional, but if provided must be valid)
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  if (phone && (!PHONE_REGEX.test(phone) || phone.length < 6 || phone.length > 30)) {
    errors.phone = 'Please provide a valid phone number or leave blank.';
  }

  // Product Category (Required)
  const category = typeof body.category === 'string' ? body.category.trim().toLowerCase() : '';
  if (!category) {
    errors.category = 'Please select a product category.';
  }

  // Estimated Quantity (Required)
  const quantity = typeof body.quantity === 'string' ? body.quantity.trim() : '';
  if (!quantity) {
    errors.quantity = 'Estimated quantity tier is required.';
  }

  // Target Timeline (Required)
  const timeline = typeof body.timeline === 'string' ? body.timeline.trim() : '';
  if (!timeline) {
    errors.timeline = 'Target timeline is required.';
  }

  // Budget Range (Optional)
  const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
  if (budget && budget.length > 80) {
    errors.budget = 'Budget description exceeds character limit.';
  }

  // Project Description / Notes (Required)
  const description = typeof body.description === 'string' 
    ? body.description.trim() 
    : typeof body.notes === 'string' 
      ? body.notes.trim() 
      : '';
  if (!description) {
    errors.description = 'Project description or technical requirements are required.';
  } else if (description.length < 10) {
    errors.description = 'Please provide at least 10 characters describing your project.';
  } else if (description.length > 4000) {
    errors.description = 'Project description must not exceed 4000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      company,
      email,
      phone: phone || 'Not provided',
      category,
      quantity,
      timeline,
      budget: budget || 'Not specified',
      description
    }
  };
}

/**
 * Validates uploaded files server-side
 * @param {Array} files - Array of multer file objects
 * @returns {Object} { isValid: boolean, error: string|null }
 */
export function validateFiles(files = []) {
  if (!files || files.length === 0) {
    return { isValid: true, error: null };
  }

  if (files.length > 3) {
    return {
      isValid: false,
      error: 'Maximum 3 files are allowed per submission.'
    };
  }

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.ai'];
  const ALLOWED_MIMES = [
    'application/pdf',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/postscript',
    'application/illustrator',
    'application/vnd.adobe.illustrator',
    'application/octet-stream' // often sent for .ai files
  ];

  for (const file of files) {
    // Size check
    if (file.size > MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: `File "${file.originalname}" exceeds the 10MB limit.`
      };
    }

    // Extension check
    const ext = (file.originalname.match(/\.[^.]+$/) || [''])[0].toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        isValid: false,
        error: `File type "${ext}" is not supported. Allowed formats: PDF, PNG, JPG, JPEG, AI.`
      };
    }

    // MIME check (relax for .ai if octet-stream)
    if (!ALLOWED_MIMES.includes(file.mimetype.toLowerCase()) && ext !== '.ai') {
      return {
        isValid: false,
        error: `Invalid MIME type for file "${file.originalname}".`
      };
    }
  }

  return { isValid: true, error: null };
}
