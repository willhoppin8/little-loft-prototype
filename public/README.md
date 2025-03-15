# Little Loft Favicon Generator

This directory contains files for generating and using the Little Loft favicon.

## Files

- `favicon.svg` - The main SVG favicon file
- `favicon-generator.html` - A tool to generate PNG versions of the favicon in different sizes
- `site.webmanifest` - Web app manifest file for mobile devices

## How to Generate Favicon Files

1. Open `favicon-generator.html` in a web browser
2. The page will display the favicon in different sizes (16x16, 32x32, 64x64, 128x128)
3. Click the "Download All Favicons" button to download PNG versions of each size
4. Place the downloaded files in the `public/icons` directory

## Favicon Implementation

The favicon is already implemented in the main HTML file with the following code:

```html
<!-- Favicon -->
<link rel="icon" href="public/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="public/favicon.ico" type="image/x-icon">
<link rel="apple-touch-icon" href="public/icons/apple-touch-icon.png">
<link rel="manifest" href="public/site.webmanifest">
<meta name="theme-color" content="#000000">
```

This implementation provides good cross-browser support and mobile device compatibility. 