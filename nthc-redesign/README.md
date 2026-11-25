# NTHC Limited website redesign

A complete frontend redesign of nthc.com.gh. Like the current site it is a React app, and it talks to the same backend (`apibeta.nthc.com.gh`).

## Run it

```bash
npm install          # installs react, react-dom and esbuild
npm run dev          # http://localhost:5173, rebuilds on change
npm run build        # production files in dist/ (upload this folder)
npm run build:single # one self-contained dist-single/index.html (for previews)
```

Node 18 or newer is required. `dist/` is static, so it can be hosted anywhere (cPanel, Netlify, Nginx and so on). It uses hash routes (`/#about`), so no server rewrite rules are needed. Old links such as `/board` and `/form_downloads` are redirected to the matching new pages.

## Structure

```
src/
  config.js              API base URL, company code, cache and timeout settings
  data/content.js        All company text and data (edit copy here)
  lib/api.js             Calls to the existing backend, with a snapshot fallback
  lib/router.jsx         Hash router and <Link>
  lib/useApi.js          Loading-state hook for api.* calls
  lib/format.js          Date and money formatting
  components/            Header, Footer, PageHeader, Photo (+ official Logo), Icon,
                         Tabs, Dialog, ReportTable, Status (notice, loading, empty)
  pages/                 One file per page
  styles/main.css        Single stylesheet, organised by numbered sections
```

## Backend integration (preserved)

| Feature | Endpoint |
| --- | --- |
| Contact form | `POST /api/contact/contact_us` `{first_name,last_name,email,telephone,message}` |
| Market review, newsletters, articles, equity research | `GET /api/research/{market_review,newsletters,articles,equity_research}` |
| Board, executives, group team | `/api/management/{board,executives,group_business_committee}` `{company:"NTHC_Ltd"}` |
| Forms download | `GET /api/downloads/get_download_forms` |
| Gallery | `GET /api/gallery/categories`, `/api/gallery/group_photos` `{group}` |
| Images and PDFs | `https://apibeta.nthc.com.gh/getimage/...` |

If the API cannot be reached, each page shows the last published data from `data/content.js`, with a small notice. A missing photo is replaced by a designed placeholder, so no image ever breaks.

**Check before go-live:** the old app calls management/gallery-group endpoints through a helper whose HTTP method was not visible in the compiled code. `api.js` tries GET with query params, then POST with a JSON body. Confirm which one the backend expects. Also make sure the API allows CORS from the domain the new site is served on.
