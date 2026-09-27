# Qur'an Web App

A beginner-friendly Qur'an reader built with HTML, CSS and JavaScript.

## Included

- 114-surah list
- Search
- Arabic Qur'an text
- English translation
- Surah reader
- Previous/next navigation
- Dark mode
- Arabic font-size controls
- Local bookmarks
- Last-surah memory
- Responsive mobile layout

## Run it

Because the app uses `fetch()` to call the Qur'an API, the easiest option is to run it through a local web server.

### VS Code

Install the Live Server extension, then right-click `index.html` → **Open with Live Server**.

Or with Python:

```bash
python3 -m http.server 5500
```

Then open:

http://localhost:5500

## API

The starter app uses AlQuran Cloud's public API:

https://api.alquran.cloud/

The API is used for the Arabic Qur'an text, surah metadata, and the English translation.

## Important next step

Before publishing a production religious app, verify the exact Arabic text, translation edition, attribution/license requirements, and API terms. For a serious release, consider adding a trusted source-verification workflow rather than relying on a single remote API.
