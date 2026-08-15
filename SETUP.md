# SEMICOLON — Google Sheets Integration Setup Guide

This guide connects your registration form to a Google Spreadsheet so every submission lands automatically in your sheet.

---

## Step 1 — Create a Google Spreadsheet

1. Open [Google Sheets](https://sheets.google.com) and click **+ Blank** to create a new spreadsheet.
2. Give it a name, e.g. `SEMICOLON Registrations`.
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/ *** THIS PART *** /edit
   ```
   Example:
   ```
   https://docs.google.com/spreadsheets/d/10LPP9EN-o-19KthWDwXlN7OCypBw8SQOVgaOnV68eNQ/edit?usp=sharing
   ```
   Your ID is: `10LPP9EN-o-19KthWDwXlN7OCypBw8SQOVgaOnV68eNQ` ✅ **Already set in Code.gs**

---

## Step 2 — Open Google Apps Script

1. In your new spreadsheet, click **Extensions → Apps Script** from the menu bar.
2. This opens the script editor. Delete any existing code in the `Code.gs` file.

---

## Step 3 — Paste the Script

1. Open the `Code.gs` file from this folder in VS Code.
2. Copy **all** the contents.
3. Paste it into the Apps Script editor.
4. The Spreadsheet ID is **already set** — no changes needed:
   ```js
   const SPREADSHEET_ID = '10LPP9EN-o-19KthWDwXlN7OCypBw8SQOVgaOnV68eNQ'; // ✅ Done
   ```

5. Click the **💾 Save** icon (or `Ctrl+S` / `Cmd+S`).

---

## Step 4 — Test the Script

1. In the Apps Script editor, click the **Run** button (▶) and select the function `testSubmission`.
2. You'll be asked to grant permissions — click **Review permissions → Allow**.
3. Go back to your spreadsheet and check that a test row was added under a `Registrations` tab.
4. If it worked, delete the test row from the spreadsheet.

---

## Step 5 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the ⚙️ gear icon next to **Select type** and choose **Web app**.
3. Fill in the settings:
   | Setting | Value |
   |---|---|
   | **Description** | SEMICOLON Registration Webhook |
   | **Execute as** | **Me** (your Google account) |
   | **Who has access** | **Anyone** |
4. Click **Deploy**.
5. Click **Authorize access** and allow the required permissions.
6. You'll see a **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycbw.../exec
   ```
   **Copy this URL.**

> **Important:** Keep this URL private. Anyone with it can submit data to your sheet.

---

## Step 6 — Connect the Website

1. Open `index.html` in VS Code.
2. Near the top of the `<script>` section, find this line:
   ```js
   const WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEBHOOK_URL_HERE';
   ```
3. Replace the placeholder with the Web App URL you copied:
   ```js
   const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw.../exec';
   ```
4. Save `index.html`.

---

## Step 7 — Test Live Submission

1. Open `index.html` in your browser.
2. Click **Register Now** and fill out the form.
3. Submit and confirm the success screen appears.
4. Open your Google Spreadsheet and verify the registration row was added.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| No row added to sheet | Verify `SPREADSHEET_ID` is correct and the spreadsheet is shared with your Google account |
| Permission error | Re-deploy the script and re-authorize |
| Old URL not working after re-deploy | Always use a **new** deployment URL after changes; old ones may expire |
| CORS errors in console | Normal — `no-cors` mode is used, data still reaches the sheet |

---

## What Each Submission Captures

| Column | Field |
|---|---|
| Timestamp | Auto-generated submission time |
| Team Name | Team's chosen name |
| College / Institution | Team's college |
| Leader Name / Email / Phone | Team leader's contact info |
| Teammate 2–4 Details | Name, email, phone (if provided) |

---

## Need Help?

Contact the TechTrack team at Birla Global University for technical support.
