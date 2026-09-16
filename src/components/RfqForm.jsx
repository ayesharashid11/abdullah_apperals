// src/components/RfqForm.jsx
import React, { useState, useRef } from 'react';
import { submitRfq } from '../lib/api/rfq.js';

const QUANTITY_OPTIONS = [
  { value: '100-500', label: '100-500' },
  { value: '500-2k', label: '500-2k' },
  { value: '2k-5k', label: '2k-5k' },
  { value: '5k+', label: '5k+' }
];

const TIMELINE_OPTIONS = [
  { value: '< 4 Weeks', label: '< 4 Weeks (Rush)' },
  { value: '4-8 Weeks', label: '4-8 Weeks (Standard)' },
  { value: '8-12 Weeks', label: '8-12 Weeks' },
  { value: 'Flexible', label: 'Flexible' }
];

const BUDGET_OPTIONS = [
  { value: 'Under $10k', label: 'Under $10,000' },
  { value: '$10k - $25k', label: '$10,000 - $25,000' },
  { value: '$25k - $50k', label: '$25,000 - $50,000' },
  { value: '$50k+', label: '$50,000+' }
];

const ALLOWED_EXTENSIONS = ['.pdf', '.png', '.jpg', '.jpeg', '.ai'];
const MAX_FILES = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function RfqForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: '',
    quantity: '100-500',
    timeline: '4-8 Weeks',
    budget: '',
    notes: ''
  });

  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Submission statuses: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [submittedDataSnapshot, setSubmittedDataSnapshot] = useState(null);

  const fileInputRef = useRef(null);

  // Field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field if user changes it
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Process selected or dropped files with validation
  const handleAddFiles = (newFileList) => {
    setFileError('');
    const newFilesArray = Array.from(newFileList);

    if (files.length + newFilesArray.length > MAX_FILES) {
      setFileError(`You can upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    const validated = [];
    for (const file of newFilesArray) {
      const ext = (file.name.match(/\.[^.]+$/) || [''])[0].toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        setFileError(`File "${file.name}" is not supported. Allowed formats: PDF, PNG, JPG, JPEG, AI.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File "${file.name}" exceeds the 10MB limit.`);
        return;
      }
      validated.push(file);
    }

    setFiles((prev) => [...prev, ...validated]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFileError('');
  };

  // Drag and Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
    }
  };

  // Client-side quick check before dispatching to API
  const validateClientSide = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.company.trim()) errors.company = 'Company name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid work email address.';
    }
    if (!formData.category) errors.category = 'Please select a product category.';
    if (!formData.quantity) errors.quantity = 'Please select an estimated quantity.';
    if (!formData.timeline) errors.timeline = 'Please select a target timeline.';
    if (!formData.notes.trim()) {
      errors.notes = 'Please describe your project requirements and specifications.';
    } else if (formData.notes.trim().length < 10) {
      errors.notes = 'Please provide at least 10 characters for your project description.';
    }

    return errors;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage('');

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setValidationErrors(clientErrors);
      setStatus('idle');
      return;
    }

    setValidationErrors({});
    setStatus('submitting');

    // Build payload
    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('company', formData.company.trim());
    payload.append('email', formData.email.trim());
    payload.append('phone', formData.phone.trim());
    payload.append('category', formData.category);
    payload.append('quantity', formData.quantity);
    payload.append('timeline', formData.timeline);
    payload.append('budget', formData.budget);
    payload.append('description', formData.notes.trim());

    files.forEach((file) => {
      payload.append('files', file);
    });

    const result = await submitRfq(payload);

    if (result.success) {
      setStatus('success');
      setServerMessage(result.message);
      setSubmittedDataSnapshot({
        ...formData,
        fileCount: files.length,
        fileNames: files.map((f) => f.name)
      });
    } else {
      setStatus('error');
      setServerMessage(result.message || 'We could not submit your request. Please try again.');
      if (result.errors) {
        setValidationErrors(result.errors);
      }
    }
  };

  // Reset form to submit another RFQ
  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      category: '',
      quantity: '100-500',
      timeline: '4-8 Weeks',
      budget: '',
      notes: ''
    });
    setFiles([]);
    setFileError('');
    setValidationErrors({});
    setStatus('idle');
    setServerMessage('');
    setSubmittedDataSnapshot(null);
  };

  // SUCCESS VIEW
  if (status === 'success') {
    return (
      <div className="bg-white border border-[#c3c6ce] p-8 md:p-12 rounded-[2px]" role="alert" aria-live="polite">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#c3c6ce]">
          <div className="w-12 h-12 rounded-full bg-[#e7f3eb] text-[#3f7a4e] flex items-center justify-center shrink-0 border border-[#b2ddbc]">
            <span className="material-symbols-outlined text-2xl">check</span>
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-[#1b1c1a]">
              We&apos;ve received your inquiry.
            </h2>
            <p className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#3f7a4e] font-semibold mt-0.5">
              RFQ Dispatched to Merchandising & Technical Desk
            </p>
          </div>
        </div>

        <p className="font-['Inter'] text-base text-[#43474d] mb-6 leading-relaxed">
          Your request has been submitted successfully. A confirmation email has been dispatched to{' '}
          <strong className="text-[#1b1c1a]">{submittedDataSnapshot?.email}</strong>. Our engineering team is reviewing your requirements and will reach out with initial feasibility estimates.
        </p>

        {submittedDataSnapshot && (
          <div className="bg-[#fbf9f5] border border-[#c3c6ce] p-6 rounded-[2px] mb-8 font-['IBM_Plex_Mono'] text-xs space-y-3">
            <div className="text-[#73777e] uppercase tracking-wider font-semibold border-b border-[#e4e0d8] pb-2">
              Submission Receipt
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#1b1c1a]">
              <div><span className="text-[#73777e]">Client:</span> {submittedDataSnapshot.name}</div>
              <div><span className="text-[#73777e]">Company:</span> {submittedDataSnapshot.company}</div>
              <div><span className="text-[#73777e]">Category:</span> {submittedDataSnapshot.category}</div>
              <div><span className="text-[#73777e]">Quantity:</span> {submittedDataSnapshot.quantity} units</div>
              <div><span className="text-[#73777e]">Timeline:</span> {submittedDataSnapshot.timeline}</div>
              <div><span className="text-[#73777e]">Attachments:</span> {submittedDataSnapshot.fileCount} file(s)</div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="bg-[#1d3956] text-white px-6 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-semibold hover:bg-[#263c55] transition-colors"
          >
            Submit Another Request
          </button>
          <a
            href="/"
            className="border border-[#c3c6ce] text-[#1b1c1a] px-6 py-3.5 rounded-[2px] font-['IBM_Plex_Mono'] text-xs uppercase tracking-widest font-medium hover:bg-[#f0eeea] transition-colors"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8" aria-label="Request a Quote Form">
      {/* Global Error Banner if API Fails */}
      {status === 'error' && (
        <div className="p-4 bg-[#ffdad6] border border-[#ba1a1a] text-[#93000a] rounded-[2px] flex items-start gap-3" role="alert">
          <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">error</span>
          <div className="text-sm font-['Inter']">
            <p className="font-semibold">{serverMessage}</p>
            <p className="text-xs mt-1 text-[#732601]">Your entered form details are preserved below. Please review any highlighted fields and retry.</p>
          </div>
        </div>
      )}

      {/* 1. Contact Details */}
      <div className="space-y-6">
        <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#1b1c1a] border-b border-[#c3c6ce] pb-2">
          Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="label-base" htmlFor="rfq-name">
              Full Name <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="rfq-name"
              name="name"
              type="text"
              required
              disabled={status === 'submitting'}
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleInputChange}
              aria-invalid={!!validationErrors.name}
              aria-describedby={validationErrors.name ? 'rfq-name-err' : undefined}
              className={`input-base ${validationErrors.name ? 'border-[#ba1a1a] focus:ring-[#ba1a1a] bg-[#fff8f7]' : ''}`}
            />
            {validationErrors.name && (
              <p id="rfq-name-err" className="mt-1.5 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono']">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="label-base" htmlFor="rfq-company">
              Company Name <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="rfq-company"
              name="company"
              type="text"
              required
              disabled={status === 'submitting'}
              placeholder="Acme Corp"
              value={formData.company}
              onChange={handleInputChange}
              aria-invalid={!!validationErrors.company}
              aria-describedby={validationErrors.company ? 'rfq-company-err' : undefined}
              className={`input-base ${validationErrors.company ? 'border-[#ba1a1a] focus:ring-[#ba1a1a] bg-[#fff8f7]' : ''}`}
            />
            {validationErrors.company && (
              <p id="rfq-company-err" className="mt-1.5 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono']">
                {validationErrors.company}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Work Email */}
          <div>
            <label className="label-base" htmlFor="rfq-email">
              Work Email <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              id="rfq-email"
              name="email"
              type="email"
              required
              disabled={status === 'submitting'}
              placeholder="jane@acmecorp.com"
              value={formData.email}
              onChange={handleInputChange}
              aria-invalid={!!validationErrors.email}
              aria-describedby={validationErrors.email ? 'rfq-email-err' : undefined}
              className={`input-base ${validationErrors.email ? 'border-[#ba1a1a] focus:ring-[#ba1a1a] bg-[#fff8f7]' : ''}`}
            />
            {validationErrors.email && (
              <p id="rfq-email-err" className="mt-1.5 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono']">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="label-base" htmlFor="rfq-phone">
              Phone Number <span className="text-[#73777e] normal-case text-[11px]">(Optional)</span>
            </label>
            <input
              id="rfq-phone"
              name="phone"
              type="tel"
              disabled={status === 'submitting'}
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-base"
            />
          </div>
        </div>
      </div>

      {/* 2. Project Specifications */}
      <div className="space-y-6 pt-4">
        <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#1b1c1a] border-b border-[#c3c6ce] pb-2">
          Project Specifications
        </h2>

        {/* Product Category */}
        <div>
          <label className="label-base" htmlFor="rfq-category">
            Product Category <span className="text-[#ba1a1a]">*</span>
          </label>
          <div className="relative">
            <select
              id="rfq-category"
              name="category"
              required
              disabled={status === 'submitting'}
              value={formData.category}
              onChange={handleInputChange}
              aria-invalid={!!validationErrors.category}
              aria-describedby={validationErrors.category ? 'rfq-category-err' : undefined}
              className={`input-base appearance-none cursor-pointer pr-10 ${
                validationErrors.category ? 'border-[#ba1a1a] bg-[#fff8f7]' : ''
              }`}
            >
              <option value="" disabled>Select category...</option>
              <option value="knitwear">Technical Knitwear (MOQ 300)</option>
              <option value="outerwear">Performance Outerwear (MOQ 400)</option>
              <option value="cut-and-sew">Cut &amp; Sew Wovens (MOQ 500)</option>
              <option value="activewear">Activewear &amp; Stretch Jersey</option>
              <option value="accessories">Soft Technical Accessories</option>
              <option value="tailored-wovens">Tailored Blazers &amp; Shirting</option>
              <option value="custom">Custom Production / Specialty</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#73777e] pointer-events-none">
              expand_more
            </span>
          </div>
          {validationErrors.category && (
            <p id="rfq-category-err" className="mt-1.5 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono']">
              {validationErrors.category}
            </p>
          )}
        </div>

        {/* Estimated Initial Quantity */}
        <div>
          <label className="label-base" id="rfq-quantity-label">
            Estimated Initial Quantity <span className="text-[#ba1a1a]">*</span>
          </label>
          <div 
            className="flex flex-wrap border border-[#c3c6ce] bg-white rounded-[2px] overflow-hidden"
            role="radiogroup" 
            aria-labelledby="rfq-quantity-label"
          >
            {QUANTITY_OPTIONS.map((opt, idx) => {
              const isSelected = formData.quantity === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={status === 'submitting'}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setFormData((prev) => ({ ...prev, quantity: opt.value }))}
                  className={`flex-1 py-3 px-3 text-center font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider transition-colors ${
                    idx < QUANTITY_OPTIONS.length - 1 ? 'border-r border-[#c3c6ce]' : ''
                  } ${
                    isSelected 
                      ? 'bg-[#35506e] text-white' 
                      : 'text-[#43474d] hover:bg-[#eae8e4] bg-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Timeline & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Timeline */}
          <div>
            <label className="label-base" htmlFor="rfq-timeline">
              Target Timeline <span className="text-[#ba1a1a]">*</span>
            </label>
            <div className="relative">
              <select
                id="rfq-timeline"
                name="timeline"
                required
                disabled={status === 'submitting'}
                value={formData.timeline}
                onChange={handleInputChange}
                className="input-base appearance-none cursor-pointer pr-10"
              >
                {TIMELINE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#73777e] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Budget Range (Optional) */}
          <div>
            <label className="label-base" htmlFor="rfq-budget">
              Budget Range <span className="text-[#73777e] normal-case text-[11px]">(Optional)</span>
            </label>
            <div className="relative">
              <select
                id="rfq-budget"
                name="budget"
                disabled={status === 'submitting'}
                value={formData.budget}
                onChange={handleInputChange}
                className="input-base appearance-none cursor-pointer pr-10"
              >
                <option value="">Select target budget (optional)...</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#73777e] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Technical File Upload */}
        <div>
          <label className="label-base" htmlFor="file-upload-input">
            Technical Files (Tech Packs, CAD, Patterns, Specs)
          </label>

          <input
            ref={fileInputRef}
            id="file-upload-input"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.ai,application/pdf,image/png,image/jpeg"
            disabled={status === 'submitting' || files.length >= MAX_FILES}
            onChange={(e) => {
              if (e.target.files) handleAddFiles(e.target.files);
              e.target.value = '';
            }}
            className="sr-only"
          />

          {/* Drag and drop zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              if (files.length < MAX_FILES && status !== 'submitting') {
                fileInputRef.current?.click();
              }
            }}
            className={`border-2 border-dashed p-6 md:p-8 text-center rounded-[2px] transition-all cursor-pointer ${
              isDragging
                ? 'border-[#1d3956] bg-[#d1e4ff]/30'
                : 'border-[#c3c6ce] bg-white hover:bg-[#f5f3ef]'
            } ${files.length >= MAX_FILES ? 'opacity-60 cursor-not-allowed' : ''}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <span className="material-symbols-outlined text-4xl text-[#73777e] mb-2 block">
              upload_file
            </span>
            <p className="font-['Inter'] text-sm text-[#1b1c1a] font-medium mb-1">
              Drag and drop files here or click to browse
            </p>
            <p className="font-['IBM_Plex_Mono'] text-xs text-[#73777e]">
              Supported formats: PDF, PNG, JPG, JPEG, AI (Max {MAX_FILES} files, up to 10MB each)
            </p>
          </div>

          {/* File Error Notice */}
          {fileError && (
            <p className="mt-2 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono'] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">warning</span>
              {fileError}
            </p>
          )}

          {/* Attached Files List */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <span className="font-['IBM_Plex_Mono'] text-xs uppercase text-[#73777e] font-semibold">
                Attached Files ({files.length}/{MAX_FILES})
              </span>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 bg-white border border-[#c3c6ce] rounded-[2px] text-xs font-['IBM_Plex_Mono']"
                  >
                    <div className="flex items-center gap-2.5 truncate max-w-[80%]">
                      <span className="material-symbols-outlined text-[#1d3956] text-base">
                        draft
                      </span>
                      <span className="font-medium text-[#1b1c1a] truncate">{file.name}</span>
                      <span className="text-[#73777e]">
                        ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={status === 'submitting'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      className="text-[#ba1a1a] hover:text-[#732601] p-1 focus:outline-none"
                      aria-label={`Remove file ${file.name}`}
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Project Description / Notes */}
        <div>
          <label className="label-base" htmlFor="rfq-notes">
            Project Description &amp; Requirements <span className="text-[#ba1a1a]">*</span>
          </label>
          <textarea
            id="rfq-notes"
            name="notes"
            required
            rows={4}
            disabled={status === 'submitting'}
            placeholder="Any specific material requirements, garment construction details, trim references, or target timeline constraints?"
            value={formData.notes}
            onChange={handleInputChange}
            aria-invalid={!!validationErrors.notes}
            aria-describedby={validationErrors.notes ? 'rfq-notes-err' : undefined}
            className={`input-base resize-y ${
              validationErrors.notes ? 'border-[#ba1a1a] bg-[#fff8f7]' : ''
            }`}
          />
          {validationErrors.notes && (
            <p id="rfq-notes-err" className="mt-1.5 text-xs text-[#ba1a1a] font-['IBM_Plex_Mono']">
              {validationErrors.notes}
            </p>
          )}
        </div>
      </div>

      {/* Form Submission Actions */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#c3c6ce]">
        <div className="text-xs font-['IBM_Plex_Mono'] text-[#73777e]">
          <span>* Required fields</span>
          <span className="mx-2">•</span>
          <span>Encrypted SMTP delivery</span>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1d3956] text-white px-8 py-4 font-['Inter'] text-sm font-semibold rounded-[2px] transition-all ${
            status === 'submitting'
              ? 'opacity-70 cursor-not-allowed bg-[#35506e]'
              : 'hover:bg-[#263c55] active:scale-[0.99]'
          }`}
        >
          {status === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>Submitting RFQ...</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
