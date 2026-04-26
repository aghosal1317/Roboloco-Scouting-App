# RoboLoCo Scouting

FRC match scouting web app for Team 5338. Built with React + Vite and Tailwind CSS.

## Setup

### 1. Google Sheets Integration

1. Create a new [Google Sheet](https://sheets.google.com)
2. Go to **Extensions → Apps Script**
3. Delete the placeholder code and paste the contents of `apps-script/Code.gs`
4. Click **Save**, then **Deploy → New Deployment**
5. Set deployment type to **Web App**
6. Set **Execute as** → Me
7. Set **Who has access** → Anyone
8. Click **Deploy** and authorize when prompted
9. Copy the **Web App URL** shown after deployment

### 2. Configure Environment

Create a `.env` file in the project root:

```
VITE_SHEET_URL=<paste your Web App URL here>
```

### 3. Run the App

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The password is `5338scouting`.

## Build for Production

```bash
npm run build
npm run preview
```

The `dist/` folder can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Form Fields

The scouting form collects:

| Section | Fields |
|---|---|
| Match Info | Scouter Name, Match #, Team #, Alliance |
| Auto | Auto Path, Transition Period |
| Tele-Op | Active Notes, Inactive Notes, Shooting (1–10 + notes), Intaking (1–10 + notes) |
| Endgame | Notes, Climb Level (0–3) |
| Defense & Incidents | Defended, Played Defense, Immobilized/Breakdown, Penalties |
| Other | Other Notes |

## Notes

- Authenticated state is stored in `sessionStorage` — refreshing keeps you logged in, but closing the tab requires re-entering the password.
- After a successful submission, the form resets but keeps the Scouter Name filled in for convenience.
- The sheet URL uses `mode: 'no-cors'` for the fetch — Google Apps Script will still receive and process the data correctly.
# Roboloco-Scouting-App
