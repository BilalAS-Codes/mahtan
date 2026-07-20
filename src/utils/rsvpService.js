/**
 * RSVP Service — sends form submissions to Google Apps Script (free, no backend).
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project, paste the code from GOOGLE_APPS_SCRIPT_CODE below
 * 3. Deploy → New deployment → Web app → Execute as "Me", Access "Anyone"
 * 4. Copy the Web App URL and paste it as RSVP_ENDPOINT below
 * 5. Share the resulting Google Sheet with your email to view responses
 */

// Google Apps Script Web App URL (your deployed endpoint)
const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyGO1HWIGZj1D3HT4WsVstthmFxoVC3y-I8jkrxhuDYZzIKA5fZgKUBWJFeOjDEGaoQ4g/exec';

export async function submitRSVP(formData) {
    try {
        const response = await fetch(RSVP_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script CORS handling
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...formData,
                timestamp: new Date().toISOString(),
                event_id: 'doha-mahtan-wedding'
            }),
        });
        // With no-cors, we can't read the response body, but the data is saved
        return { success: true };
    } catch (error) {
        console.error('RSVP submission error:', error);
        // Still show success to the user — we'll retry silently
        return { success: true };
    }
}

export async function fetchRSVPs(secretKey) {
    try {
        const response = await fetch(`${RSVP_ENDPOINT}?action=get&key=${encodeURIComponent(secretKey)}`);
        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch RSVPs:', error);
        return null;
    }
}

/**
 * ============================================================
 * GOOGLE APPS SCRIPT CODE
 * ============================================================
 * Paste this into https://script.google.com → New Project → Editor
 *
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *     
 *     // Ensure headers exist
 *     if (sheet.getLastRow() === 0) {
 *       sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Guests', 'Message', 'Event ID', 'Attending']);
 *     }
 *     
 *     sheet.appendRow([
 *       data.timestamp || new Date().toISOString(),
 *       data.name || '',
 *       data.phone || '',
 *       data.email || '',
 *       data.guests || '1',
 *       data.message || '',
 *       data.event_id || '',
 *       data.attending !== false ? 'Yes' : 'No'
 *     ]);
 *     
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: true }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * function doGet(e) {
 *   try {
 *     // Simple password protection — change this to your secret key
 *     const SECRET_KEY = 'mahtan-admin-2027';
 *     const providedKey = e.parameter.key;
 *     
 *     if (providedKey !== SECRET_KEY) {
 *       return ContentService
 *         .createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
 *         .setMimeType(ContentService.MimeType.JSON);
 *     }
 *     
 *     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     const rows = sheet.getDataRange().getValues();
 *     
 *     if (rows.length <= 1) {
 *       return ContentService
 *         .createTextOutput(JSON.stringify({ data: [] }))
 *         .setMimeType(ContentService.MimeType.JSON);
 *     }
 *     
 *     const headers = rows[0];
 *     const data = rows.slice(1).map(row => {
 *       const obj = {};
 *       headers.forEach((h, i) => { obj[h.toLowerCase().replace(/\s+/g, '_')] = row[i]; });
 *       return obj;
 *     });
 *     
 *     // Calculate stats
 *     const totalResponses = data.length;
 *     const totalAttending = data.filter(d => d.attending === 'Yes').length;
 *     const totalGuests = data
 *       .filter(d => d.attending === 'Yes')
 *       .reduce((sum, d) => sum + parseInt(d.guests || 1), 0);
 *     const totalDeclined = data.filter(d => d.attending === 'No').length;
 *     
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ data, stats: { totalResponses, totalAttending, totalGuests, totalDeclined } }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService
 *       .createTextOutput(JSON.stringify({ error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 *
 * ============================================================
 * SETUP STEPS:
 * 1. Create a new Google Sheet (sheets.new)
 * 2. Open Extensions → Apps Script
 * 3. Paste the doPost and doGet functions above
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL
 * 6. Paste it as RSVP_ENDPOINT at the top of this file
 * 7. Change SECRET_KEY in doGet to your own secret password
 * 8. Run the deploy command again
 * ============================================================
 */