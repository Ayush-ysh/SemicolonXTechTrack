/**
 * ============================================================
 *  SEMICOLON Ideathon — Registration Data Handler
 *  Google Apps Script  (Code.gs)
 *
 *  This script receives registration form submissions from the
 *  SEMICOLON website and appends each entry as a new row in a
 *  designated Google Spreadsheet.
 *
 *  SETUP INSTRUCTIONS → See SETUP.md in the same folder.
 * ============================================================
 */

// ─── CONFIGURATION ───────────────────────────────────────────
// Replace this with your Google Spreadsheet ID.
// You can find the ID in your spreadsheet URL:
//   https://docs.google.com/spreadsheets/d/  <SPREADSHEET_ID>  /edit
const SPREADSHEET_ID = '10LPP9EN-o-19KthWDwXlN7OCypBw8SQOVgaOnV68eNQ';

// The name of the sheet tab where registrations will be stored.
const SHEET_NAME = 'Registrations';

// ─── COLUMN HEADERS ──────────────────────────────────────────
const HEADERS = [
  'Timestamp',
  'Team Name',
  'College / Institution',
  'Leader Name',
  'Leader Email',
  'Leader Phone',
  'Teammate 2 — Name',
  'Teammate 2 — Email',
  'Teammate 2 — Phone',
  'Teammate 3 — Name',
  'Teammate 3 — Email',
  'Teammate 3 — Phone',
  'Teammate 4 — Name',
  'Teammate 4 — Email',
  'Teammate 4 — Phone',
];


/**
 * doPost — Called automatically when the website POSTs form data.
 * @param {Object} e - Apps Script event object containing postData.
 * @returns {TextOutput} JSON response with status.
 */
function doPost(e) {
  try {
    // Parse the incoming JSON payload
    const data = JSON.parse(e.postData.contents);

    // Get or create the target sheet
    const sheet = getOrCreateSheet();

    // Ensure the header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
           .setFontWeight('bold')
           .setBackground('#0A0A0A')
           .setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    // Build the data row
    const row = [
      data.submittedAt ? new Date(data.submittedAt) : new Date(),
      data.teamName    || '',
      data.college     || '',
      data.leaderName  || '',
      data.leaderEmail || '',
      data.leaderPhone || '',
      data.m2Name      || '',
      data.m2Email     || '',
      data.m2Phone     || '',
      data.m3Name      || '',
      data.m3Email     || '',
      data.m3Phone     || '',
      data.m4Name      || '',
      data.m4Email     || '',
      data.m4Phone     || '',
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Auto-resize all columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    return jsonResponse({ status: 'success', message: 'Registration saved.' });

  } catch (error) {
    Logger.log('doPost error: ' + error.toString());
    return jsonResponse({ status: 'error', message: error.toString() });
  }
}


/**
 * doGet — Simple health-check endpoint.
 * Visit the Web App URL in a browser to verify it's live.
 * @returns {TextOutput} JSON status message.
 */
function doGet(e) {
  return jsonResponse({
    status:  'ok',
    message: 'SEMICOLON webhook is live and ready to accept registrations!',
    sheet:   SHEET_NAME,
  });
}


/**
 * getOrCreateSheet — Retrieves the target sheet by name, or creates it.
 * @returns {Sheet} The target Google Sheet.
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}


/**
 * jsonResponse — Wraps an object as a JSON text output.
 * @param {Object} obj - The object to serialize.
 * @returns {TextOutput}
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/**
 * testSubmission — Run this manually from the Apps Script editor
 * to verify everything is working before going live.
 */
function testSubmission() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        submittedAt:  new Date().toISOString(),
        teamName:     'Test Team',
        college:      'Birla Global University',
        leaderName:   'John Doe',
        leaderEmail:  'john@bgu.ac.in',
        leaderPhone:  '9876543210',
        m2Name:       'Jane Smith',
        m2Email:      'jane@college.edu',
        m2Phone:      '9876543211',
        m3Name:       '',
        m3Email:      '',
        m3Phone:      '',
        m4Name:       '',
        m4Email:      '',
        m4Phone:      '',
      })
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}
