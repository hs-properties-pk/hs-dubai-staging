// Normalize phone for SheetDB (strip spaces, dashes, etc.).
function normalizePhone(phone) {
  if (!phone) return '';
  // Remove spaces, dashes, parentheses, and other common formatting characters
  return String(phone).replace(/[\s\-\(\)\.]/g, '');
}

// Append a lead to the main Google Sheet via SheetDB; returns null on failure.
export async function appendLeadToSheet(leadData) {
  try {
    // Validate required environment variable
    if (!process.env.SHEETDB_API_URL) {
      console.error(
        '[SheetDB] SHEETDB_API_URL is missing. Add it in your host env (e.g. Vercel → Settings → Environment Variables). Leads will not be saved.'
      );
      return null;
    }

    // Prepare data object matching your sheet columns:
    // Timestamp | Source | First Name | Last Name | Email | Phone | Message | Inquiry Type | Subject | Property
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const sheetData = {
      Timestamp: timestamp,
      Source: leadData.source || 'Unknown',
      'First Name': leadData.firstName || leadData.fullName?.split(' ')[0] || '',
      'Last Name': leadData.lastName || leadData.fullName?.split(' ').slice(1).join(' ') || '',
      Email: leadData.email || '',
      Phone: normalizePhone(leadData.phoneNumber),
      Message: leadData.message || '',
      'Inquiry Type': leadData.inquiryType || '',
      Subject: leadData.subject || '',
      Property: leadData.property || leadData.additionalData?.propertyName || leadData.additionalData?.property || '',
    };

    // Send POST request to SheetDB
    const response = await fetch(process.env.SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [sheetData] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SheetDB API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Lead appended to SheetDB: ${leadData.email || 'N/A'}`);
    return result;
  } catch (error) {
    // Non-blocking error handling - don't throw, just log
    console.error('SheetDB API error:', error.message);
    return null;
  }
}

// Append a community lead to the Communities tab; returns null on failure.
export async function appendCommunityLeadToSheet(leadData) {
  try {
    // Validate required environment variable
    if (!process.env.SHEETDB_API_URL) {
      console.error(
        '[SheetDB] SHEETDB_API_URL is missing. Community leads will not be saved. Configure it on your production host.'
      );
      return null;
    }
    // Use the same API URL with ?sheet=Communities parameter to target the Communities tab
    const apiUrl = `${process.env.SHEETDB_API_URL}?sheet=Communities`;

    // Prepare data object matching your communities sheet columns:
    // Timestamp | Community | First Name | Last Name | Email | Phone | Budget | Residence Type | User Type | Purpose | Invest Timeline | Project Interest | Message
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const sheetData = {
      Timestamp: timestamp,
      Community: leadData.source || leadData.community || 'Unknown',
      'First Name': leadData.firstName || leadData.fullName?.split(' ')[0] || '',
      'Last Name': leadData.lastName || leadData.fullName?.split(' ').slice(1).join(' ') || '',
      Email: leadData.email || '',
      Phone: normalizePhone(leadData.phoneNumber),
      Budget: leadData.budget || '',
      'Residence Type': leadData.residenceType || '',
      'User Type': leadData.userType || '',
      Purpose: leadData.purpose || '',
      'Invest Timeline': leadData.investTimeline || '',
      'Project Interest': leadData.projectInterest || '',
      Message: leadData.message || '',
    };

    // Send POST request to SheetDB
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [sheetData] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SheetDB API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Community lead appended to SheetDB: ${leadData.email || 'N/A'}`);
    return result;
  } catch (error) {
    // Non-blocking error handling - don't throw, just log
    console.error('SheetDB Communities API error:', error.message);
    return null;
  }
}

// Append a newsletter row to the Newsletter tab; returns null on failure.
export async function appendNewsletterLeadToSheet(leadData) {
  try {
    // Validate required environment variable
    if (!process.env.SHEETDB_API_URL) {
      console.error(
        '[SheetDB] SHEETDB_API_URL is missing. Newsletter rows will not be saved. Configure it on your production host.'
      );
      return null;
    }
    // Use the same API URL with ?sheet=Newsletter parameter to target the Newsletter tab
    const apiUrl = `${process.env.SHEETDB_API_URL}?sheet=Newsletter`;

    // Prepare data object matching your newsletter sheet columns:
    // Timestamp | Email | Source
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    
    const sheetData = {
      Timestamp: timestamp,
      Email: leadData.email || '',
      Source: leadData.source || 'Newsletter Subscription',
      // Note: Newsletter doesn't have phone, but normalizePhone handles empty strings
    };

    // Send POST request to SheetDB
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [sheetData] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SheetDB API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`✅ Newsletter subscription appended to SheetDB: ${leadData.email || 'N/A'}`);
    return result;
  } catch (error) {
    // Non-blocking error handling - don't throw, just log
    console.error('SheetDB Newsletter API error:', error.message);
    return null;
  }
}
