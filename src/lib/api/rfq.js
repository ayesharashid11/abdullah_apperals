// src/lib/api/rfq.js

/**
 * Sends the Request for Quote payload to the backend API endpoint
 * @param {FormData|Object} payload 
 * @returns {Promise<{success: boolean, message: string, errors?: Object}>}
 */
export async function submitRfq(payload) {
  // Use environment variable or relative API endpoint
  const baseUrl = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL) 
    || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
    || '';
    
  const endpoint = `${baseUrl}/api/rfq`;

  let bodyData;
  if (payload instanceof FormData) {
    bodyData = payload;
  } else {
    bodyData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'files' && Array.isArray(payload[key])) {
        payload[key].forEach(file => {
          bodyData.append('files', file);
        });
      } else if (payload[key] !== undefined && payload[key] !== null) {
        bodyData.append(key, payload[key]);
      }
    });
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: bodyData
      // Note: Do NOT set Content-Type header manually for FormData; browser sets it with proper boundary
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: (data && data.message) || 'We could not submit your request. Please try again.',
        errors: (data && data.errors) || null,
        status: response.status
      };
    }

    return {
      success: true,
      message: (data && data.message) || 'Your request has been submitted successfully.'
    };
  } catch (error) {
    console.error('[API Error] Network or server communication failed:', error);
    return {
      success: false,
      message: 'Network connection error. Please check your internet connection and try again.'
    };
  }
}
