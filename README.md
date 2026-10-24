# Dark Theme for Play Console (Unofficial)

A free Chrome extension that turns on a dark mode for the [Google Play Console](https://play.google.com/console).

![Play Console app dashboard in dark mode](docs/screenshot-1-app-dashboard.png)

## Why it looks right

Play Console already contains a complete dark colour palette. It just has no switch for it. This extension switches it on by adding the console's own `acx-dark-theme` class to the page, and fills in the page background the theme leaves white.

Because it uses Google's own dark colours instead of inverting the page, text, cards, buttons and charts keep their intended look.

![KPI charts in dark mode](docs/screenshot-2-charts.png)

## Features

- Dark mode across the dashboard, app pages, statistics and dialogs
- One click on the toolbar icon turns it on or off; your choice is remembered
- Runs only on `play.google.com/console`
- No tracking, no data collection, no network requests

## Install

**Chrome Web Store:** coming soon.

**From source:**

1. Download or clone this repository.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and select the `extension` folder.

## Build the store package

```bash
cd extension && zip -r ../dist/play-console-dark-theme.zip . && cd ..
```

(Create the `dist` folder first with `mkdir -p dist`.)

## Known limitations

- Chart axis lines stay light.
- Google may change Play Console's internals at any time, which could break the theme until the extension is updated.

## Support

The extension is free. If it saves your eyes, you can leave a tip by right-clicking the toolbar icon, or here:

- [Buy Me a Coffee](https://buymeacoffee.com/maksforge): card, Apple Pay or Google Pay, no account needed
- [PayPal](https://paypal.me/maksymiliansredniawa)

## Disclaimer

This is an unofficial project, not affiliated with or endorsed by Google. Google Play is a trademark of Google LLC.

## License

[MIT](LICENSE) © 2026 Maksymilian Średniawa (MaksForge)
