// backend/services/mailService.js
import nodemailer from 'nodemailer';
import fs from 'fs';

let transporterInstance = null;

/**
 * Initializes and retrieves the Nodemailer transporter instance
 * Supports real SMTP credentials via environment variables and fallback ethereal/stream for development testing
 */
export async function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.replace(/\s+/g, '') : '';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    // Always use real SMTP credentials when configured in .env
    const realTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    return realTransporter;
  }

  if (transporterInstance) {
    return transporterInstance;
  }

  // Development fallback: Use an Ethereal test account or JSON stream transporter
  console.log('ℹ️ [Nodemailer] No full SMTP credentials found in env. Initializing simulated mail transport.');
  try {
    const testAccount = await nodemailer.createTestAccount();
    transporterInstance = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    console.log('✅ [Nodemailer] Ethereal test account created for development preview:', testAccount.user);
  } catch (err) {
    console.log('ℹ️ [Nodemailer] Using JSON stream transport for local preview mode.');
    transporterInstance = nodemailer.createTransport({
      jsonTransport: true
    });
  }

  return transporterInstance;
}

/**
 * Sends the internal RFQ notification email to the Abdullah Apparels Networks team
 */
export async function sendInternalRfqEmail(data, files = []) {

  const transporter = await getTransporter();

  const fromEmail = process.env.RFQ_FROM_EMAIL || '"Abdullah Apparels RFQ" <ayesha.rashiddev@gmail.com>';
  const toEmail = process.env.RFQ_RECEIVER_EMAIL || 'ayesha.rashiddev@gmail.com';

  const categoryLabels = {
    'knitwear': 'Technical Knitwear',
    'outerwear': 'Performance Outerwear',
    'cut-and-sew': 'Cut & Sew Wovens',
    'activewear': 'Activewear & Stretch Jersey',
    'accessories': 'Soft Technical Accessories',
    'tailored-wovens': 'Tailored Blazers & Shirting',
    'custom': 'Custom Production / Specialty'
  };

  const formattedCategory = categoryLabels[data.category] || data.category;

  const fileAttachments = (files || [])
    .filter(file => file && file.path && fs.existsSync(file.path))
    .map(file => ({
      filename: file.originalname || 'attachment',
      path: file.path,
      contentType: file.mimetype
    }));

  const fileListHtml = files && files.length > 0
    ? `<ul style="margin: 8px 0; padding-left: 20px; color: #2B2E33; font-family: monospace;">
        ${files.map(f => `<li><strong>${f.originalname}</strong> (${(f.size / (1024 * 1024)).toFixed(2)} MB)</li>`).join('')}
       </ul>`
    : '<p style="margin: 4px 0; color: #73777E; font-style: italic;">No files attached</p>';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F5F3EF; margin: 0; padding: 20px; color: #14161A; }
        .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4E0D8; border-radius: 4px; overflow: hidden; }
        .header { background-color: #1D3956; padding: 28px 32px; color: #FFFFFF; }
        .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; text-transform: uppercase; font-family: monospace; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #A7C2E5; letter-spacing: 0.05em; font-family: monospace; }
        .body { padding: 32px; }
        .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #35506E; border-bottom: 2px solid #F0EEEA; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px; }
        .spec-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        .spec-table td { padding: 10px 12px; border-bottom: 1px solid #F0EEEA; font-size: 14px; }
        .spec-table .label { width: 35%; font-weight: 600; color: #73777E; text-transform: uppercase; font-size: 12px; font-family: monospace; }
        .spec-table .value { color: #14161A; font-weight: 500; }
        .desc-box { background: #FBF9F5; border: 1px solid #E4E0D8; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #2B2E33; white-space: pre-wrap; }
        .footer { background: #F0EEEA; padding: 16px 32px; font-size: 12px; color: #73777E; text-align: center; border-top: 1px solid #E4E0D8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ABDULLAH APPARELS NETWORKS</h1>
          <p>NEW MANUFACTURING INQUIRY & RFQ SUBMISSION</p>
        </div>
        <div class="body">
          <div class="section-title">Client Information</div>
          <table class="spec-table">
            <tr>
              <td class="label">Full Name</td>
              <td class="value">${data.name}</td>
            </tr>
            <tr>
              <td class="label">Company / Brand</td>
              <td class="value"><strong>${data.company}</strong></td>
            </tr>
            <tr>
              <td class="label">Work Email</td>
              <td class="value"><a href="mailto:${data.email}" style="color: #1D3956;">${data.email}</a></td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td class="value">${data.phone || 'Not provided'}</td>
            </tr>
          </table>

          <div class="section-title">Production Specifications</div>
          <table class="spec-table">
            <tr>
              <td class="label">Product Category</td>
              <td class="value"><strong>${formattedCategory}</strong></td>
            </tr>
            <tr>
              <td class="label">Quantity Tier</td>
              <td class="value">${data.quantity} units</td>
            </tr>
            <tr>
              <td class="label">Target Timeline</td>
              <td class="value">${data.timeline}</td>
            </tr>
            <tr>
              <td class="label">Budget Range</td>
              <td class="value">${data.budget || 'Not specified'}</td>
            </tr>
          </table>

          <div class="section-title">Project Scope & Technical Notes</div>
          <div class="desc-box">${data.description}</div>

          <div class="section-title">Technical Attachments (${files.length})</div>
          ${fileListHtml}
        </div>
        <div class="footer">
          Received via Abdullah Apparels Networks RFQ Gateway • ${new Date().toUTCString()}
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: fromEmail,
    to: toEmail,
    replyTo: `${data.name} <${data.email}>`,
    subject: `New RFQ Inquiry: ${data.company} — [${formattedCategory}]`,
    text: `
New Request for Quote received from ${data.name} (${data.company})
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Category: ${formattedCategory}
Quantity: ${data.quantity}
Timeline: ${data.timeline}
Budget: ${data.budget || 'N/A'}

Project Description:
${data.description}

Attached Files: ${(files || []).map(f => f.originalname).join(', ') || 'None'}
    `.trim(),
    html: htmlContent,
    attachments: fileAttachments
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('📨 [MailService] Internal RFQ email dispatched successfully. Message ID:', info.messageId || 'simulated');

  if (nodemailer.getTestMessageUrl(info)) {
    console.log('🔗 [Ethereal Preview URL]:', nodemailer.getTestMessageUrl(info));
  }

  return info;
}

/**
 * Sends a confirmation email to the customer
 */
export async function sendCustomerConfirmationEmail(data) {
  const transporter = await getTransporter();

  const fromEmail = process.env.RFQ_FROM_EMAIL || '"Abdullah Apparels Networks" <quotes@abdullahapparels.com>';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #F5F3EF; margin: 0; padding: 20px; color: #14161A; }
        .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4E0D8; border-radius: 4px; overflow: hidden; }
        .header { background-color: #1D3956; padding: 28px 32px; color: #FFFFFF; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; text-transform: uppercase; font-family: monospace; }
        .body { padding: 32px; }
        .body h2 { font-size: 20px; margin-top: 0; color: #1D3956; }
        .body p { font-size: 15px; line-height: 1.6; color: #2B2E33; margin: 16px 0; }
        .steps-card { background: #FBF9F5; border: 1px solid #E4E0D8; border-radius: 4px; padding: 20px; margin: 24px 0; }
        .step-item { display: flex; margin-bottom: 14px; font-size: 14px; line-height: 1.5; }
        .step-item:last-child { margin-bottom: 0; }
        .step-num { font-weight: bold; color: #1D3956; width: 24px; flex-shrink: 0; font-family: monospace; }
        .footer { background: #F0EEEA; padding: 20px 32px; font-size: 12px; color: #73777E; border-top: 1px solid #E4E0D8; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>ABDULLAH APPARELS NETWORKS</h1>
        </div>
        <div class="body">
          <h2>We Received Your Request for Quote</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for submitting your manufacturing requirements for <strong>${data.company}</strong>. We have received your technical specifications and project files.</p>
          
          <div class="steps-card">
            <div style="font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; color: #73777E; margin-bottom: 12px; font-family: monospace;">
              Next Steps in Our Process
            </div>
            <div class="step-item">
              <div class="step-num">01.</div>
              <div><strong>Technical Evaluation:</strong> Our engineering team reviews your tech pack and files for manufacturing feasibility and fabric yield.</div>
            </div>
            <div class="step-item">
              <div class="step-num">02.</div>
              <div><strong>Direct Contact:</strong> We will reach out to clarify any technical tolerances, GSM preferences, or material sourcing.</div>
            </div>
            <div class="step-item">
              <div class="step-num">03.</div>
              <div><strong>Formal Proposal:</strong> You will receive an itemized quote with sample lead times, unit pricing, and MOQ tiers.</div>
            </div>
          </div>

          <p>Our team will review your requirements and contact you soon.</p>
          
          <p style="margin-top: 28px; color: #14161A; font-weight: 500;">
            Sincerely,<br>
            <strong>Abdullah Apparels Networks Merchandising & Technical Team</strong><br>
            <span style="font-size: 13px; color: #73777E;">Lahore, Pakistan • Established 2021</span>
          </p>
        </div>
        <div class="footer">
          This is an automated confirmation of your RFQ submission. For direct inquiries, contact us at malikabdullah1@hotmail.com or +923008467725.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: fromEmail,
    to: data.email,
    subject: 'We Received Your Request for Quote — Abdullah Apparels Networks',
    text: `
Hello ${data.name},

Thank you for contacting Abdullah Apparels Networks. We have received your Request for Quote for ${data.company}.

Our technical and merchandising team is currently reviewing your project specifications and attached files for manufacturing feasibility.

Our team will review your requirements and contact you soon.

Sincerely,
Abdullah Apparels Networks Engineering & Merchandising Team
Lahore, Pakistan
    `.trim(),
    html: htmlContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('📨 [MailService] Customer confirmation email sent to:', data.email);
  return info;
}
