# Droidbox Guide — Certified Android TV Box Comparison

A static comparison website for certified Android TV / Google TV streaming boxes with native Netflix 4K and Amazon Prime Video support.

## 🎯 What This Is

This site focuses exclusively on **Google/Netflix certified devices** with:
- **Widevine L1** DRM certification
- **Native Netflix** at 1080p or 4K
- **Native Amazon Prime Video** support

We exclude cheap uncertified "Android boxes" that only support Netflix at SD/720p or rely on sideloaded APKs.

## 📋 Included Devices

The current catalog includes:
1. **Kinhank G1** — Amlogic S905X4-J, 4GB/32GB, Wi-Fi 6, Dolby Vision
2. **Xiaomi TV Box S (3rd Gen)** — Amlogic S905X5M, Google TV 14, Wi-Fi 6
3. **Google TV Streamer 4K** — MediaTek MT8696, first-party Google hardware
4. **Mecool KM2 Plus** — Budget certified option, Android TV 11
5. **onn. 4K Plus** — Walmart value pick, Google TV 14

All devices meet the strict certification requirements.

## 🔧 How to Manage Products

### Editing Product Data

Products are stored in `affiliate.txt` at the root of this repository. This file uses a simple key-value format separated by `---` delimiters.

**Format:**
```
---
id: product-slug
rank: 1
name: Product Name
brand: Brand Name
# ... more fields ...
affiliate_url: https://s.click.aliexpress.com/your-link-here
# Leave affiliate_url blank if not yet configured
```

### Required Fields

- `id`: Unique slug (used for anchor links)
- `rank`: Display order (1 = top)
- `name`, `brand`, `os`, `soc`: Basic product info
- `ram_gb`, `storage_gb`: Memory specs (numbers)
- `widevine`: DRM level (should be "L1")
- `netflix_max`: "1080p" or "4K"
- `prime_native`: "yes" for certified devices
- `google_certified`: "yes" for certified devices
- `wifi`, `hdr`: Connectivity and video specs
- `score_overall`, `score_streaming`, `score_value`, `score_build`: Numerical scores (0-10)
- `pros`, `cons`, `dos`, `donts`: User guidance text
- `aliexpress_search`: Fallback search query
- `affiliate_url`: Your AliExpress affiliate link (see below)
- `notes`: Optional additional context

### Adding Affiliate Links

**Important:** Only add devices that meet the certification requirements!

1. Open `affiliate.txt`
2. Find the product's `affiliate_url:` field
3. Paste your AliExpress `s.click.aliexpress.com` affiliate link
4. Example:
   ```
   affiliate_url: https://s.click.aliexpress.com/e/_DeXaMpL
   ```

**About AliExpress Affiliate Links:**
- AliExpress affiliate links use the format: `https://s.click.aliexpress.com/e/_XXXXX`
- Generate these through the [AliExpress Affiliate Program](https://portals.aliexpress.com/)
- If a product has no affiliate link, the site shows a "Search on AliExpress" fallback button
- Never invent or guess affiliate URLs — leave the field empty if you don't have one

### Rebuilding the Data File (Optional)

The site loads `data/products.json` which is generated from `affiliate.txt`:

```bash
node parse-affiliate.js
```

This step is **optional** — the site works fine referencing the JSON file that was generated during initial setup. You only need to re-run the parser if you edit `affiliate.txt` and want to test changes locally before deploying.

## 🚀 Deployment

### GitHub Pages (Recommended)

This site is designed for **GitHub Pages** deployment:

1. **Push your changes** to the `main` branch (or your default branch)
2. Go to **Settings → Pages** in your GitHub repository
3. Under **Source**, select:
   - **Branch:** `main` (or your branch)
   - **Folder:** `/ (root)`
4. Click **Save**
5. Your site will be live at `https://your-username.github.io/your-repo-name/`

### Local Testing

Open `index.html` in a web browser:

```bash
# Simple local server (Python 3)
python3 -m http.server 8000

# Then visit http://localhost:8000
```

Or use any static file server:
```bash
npx serve .
# or
php -S localhost:8000
```

### Alternative Hosting

The site is pure static HTML/CSS/JS. You can host it on:
- **Netlify** (drag & drop the folder)
- **Vercel** (import the Git repository)
- **Cloudflare Pages** (connect to GitHub)
- Any static file host (S3, Azure Static Web Apps, etc.)

## 📁 File Structure

```
.
├── index.html           # Main page
├── styles.css           # Responsive styles (mobile-first)
├── app.js               # Product rendering logic
├── affiliate.txt        # Product catalog (edit this!)
├── data/
│   └── products.json    # Generated product data
├── parse-affiliate.js   # Optional parser script
└── README.md            # This file
```

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-color: #1a73e8;    /* Main brand color */
  --success-color: #34a853;    /* High scores */
  --warning-color: #fbbc04;    /* Medium scores */
  --danger-color: #ea4335;     /* Low scores */
}
```

### Modifying Scoring Thresholds

In `app.js`, adjust the `getScoreClass()` function:

```javascript
function getScoreClass(score) {
  if (score >= 9.0) return 'high';      // Green
  if (score >= 8.0) return 'medium';    // Yellow
  return 'low';                          // Red
}
```

## ⚖️ Legal & Compliance

### Affiliate Disclosure

The site includes an affiliate disclaimer in the footer (required by FTC guidelines and most affiliate programs). The disclosure states:

> **Affiliate Disclosure:** Links on this site may earn us a commission if you make a purchase. This helps support our testing and review work at no extra cost to you.

This disclaimer appears on every page. Do not remove it.

### Product Certification

Only include devices that **genuinely meet** the certification requirements:
- Widevine L1 certified
- Google Play Certified (for Android TV) or Google TV certified
- Native Netflix app with 1080p or 4K support
- Native Amazon Prime Video app

Do not add uncertified devices or devices that require sideloading streaming apps.

## 🛠️ Troubleshooting

### Products not showing up?

1. Check `data/products.json` exists and contains valid JSON
2. Re-run `node parse-affiliate.js` to regenerate from `affiliate.txt`
3. Check browser console for JavaScript errors
4. Ensure `affiliate.txt` follows the correct format

### Affiliate links not working?

1. Verify the URL starts with `https://s.click.aliexpress.com/`
2. Test the link in an incognito/private browser window
3. Check your AliExpress affiliate account status
4. Some products may not have affiliate links — that's okay, the fallback search button will show instead

### Local file access issues?

Modern browsers block `fetch()` from `file://` URLs. Use a local web server:
```bash
python3 -m http.server 8000
```

## 📧 Support

For questions about:
- **Product certification:** Consult official Google/Netflix certification databases
- **AliExpress affiliate program:** Visit [AliExpress Portals](https://portals.aliexpress.com/)
- **GitHub Pages:** See [GitHub Pages documentation](https://docs.github.com/en/pages)

## 📜 License

See the `LICENSE` file in this repository.

---

**Built for transparency and certified streaming quality.**
