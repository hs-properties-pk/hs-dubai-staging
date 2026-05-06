/**
 * Honeypot field validation
 * Returns true if submission is likely from a bot
 * 
 * Bots often fill out hidden fields that humans can't see.
 * If any honeypot field has a value, the submission is rejected.
 */
export function isBotSubmission(data) {
  // Check common honeypot field names
  // These fields should always be empty for legitimate users
  const honeypotFields = [
    'website',
    'url',
    'website_url',
    'phone_2',
    'email_confirm',
    'company',
    'address',
    'comment',
    'message_extra',
    'website_url_field', // Alternative naming
    'homepage', // Another common one
  ];

  // If any honeypot field has a value, it's likely a bot
  for (const field of honeypotFields) {
    if (data[field] && String(data[field]).trim() !== '') {
      return true;
    }
  }

  return false;
}

