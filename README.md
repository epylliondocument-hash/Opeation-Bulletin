# SMV & Operation Master – live version (GitHub Pages + Google Drive)

All data is stored in one file in your Google Drive: `smv_master_db.json`.
The page talks to that file through a small Google Apps Script (Code.gs).

## 1. Set up the Google Drive storage (5 minutes)
1. Open https://script.google.com and click **New project**.
2. Delete the sample code and paste everything from `Code.gs`.
3. Change `CHANGE_THIS_SECRET` to your own secret text (for example a long random phrase).
4. Click **Deploy > New deployment > Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, allow the permissions Google asks for, and copy the **Web app URL**.

Your current data is already in Drive: the file `smv_master_db.json` in the folder
"SMV & Operation Master – Backups". The script finds it by its name (it uses the newest copy that is not in the Trash), so leave the name as it is.
(If you start without that file, the script creates an empty one by itself.)

## 2. Put the page on GitHub
1. In `index.html`, find the line `const CFG={SCRIPT_URL:'',KEY:''};` near the top.
2. Paste the Web app URL and your secret text between the quotes.
3. Upload `index.html` to a GitHub repository.
4. Repository **Settings > Pages**: choose the main branch and the root folder. The site goes live at
   `https://<your-name>.github.io/<repository>/`.

## Good to know
- Changes made by one person show up for others within about 15 seconds.
- The secret text is visible to anyone who views the page source, so treat this as a simple lock.
  For stronger protection use a Google sign-in version (needs a Google Cloud OAuth client ID).
- If the URL or key is wrong, or you are offline, the page still works but saves only in that browser.
- The Excel and file downloads work normally in a browser on GitHub Pages.
- The delete password is not in the data you start with: the first delete asks you to set a new one.
