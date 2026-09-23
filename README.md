# Droidbox — Certified Android TV Box Comparison

A dark-themed static comparison site for certified Android TV / Google TV streaming boxes with native Netflix 4K and Amazon Prime Video support.

## What This Is

This site lists **only** devices with:
- **Widevine L1** DRM certification
- **Google Play Certified** (Android TV) or **Google TV certified**
- **Native Netflix** at 1080p or 4K
- **Native Amazon Prime Video** support

No uncertified boxes. No sideload-dependent devices. No SD/720p Netflix boxes.

## Included Devices

| Rank | Device | Overall Score | Best For |
|------|--------|---------------|----------|
| 1 | Kinhank G1 | 9.1 | AliExpress shoppers |
| 2 | Xiaomi TV Box S (3rd Gen) | 9.3 | Streaming performance |
| 3 | Google TV Streamer 4K | 9.4 | Premium / first-party |
| 4 | Mecool KM2 Plus | 7.8 | Budget certified |
| 5 | onn. 4K Plus | 8.6 | US retail (Walmart) |

## How to Add Affiliate Links

**This is the ONLY thing you need to edit to make money from this site.**

### Step 1: Get Your AliExpress Affiliate Link

1. Join the [AliExpress Affiliate Program](https://portals.aliexpress.com/)
2. Find a product listing on AliExpress
3. Generate an affiliate link — it will look like: `https://s.click.aliexpress.com/e/_XXXXX`

### Step 2: Edit affiliate.txt

1. Open `affiliate.txt` in the repository root
2. Find the product you want to add a link for
3. Paste your `s.click.aliexpress.com` URL on the `affiliate_url:` line

**Example:**
```
---
id: kinhank-g1
rank: 1
name: Kinhank G1
# ... other fields ...
affiliate_url: https://s.click.aliexpress.com/e/_DeXaMpL
```

### Step 3: Regenerate Data (Optional)

```bash
node parse-affiliate.js
```

This updates `data/products.json` from `affiliate.txt`. The site reads `products.json` at runtime.

**Note:** If you commit and push `affiliate.txt`, you can regenerate `products.json` in CI or locally before deploying.

### Step 4: Commit and Deploy

```bash
git add affiliate.txt data/products.json
git commit -m "Add affiliate link for Kinhank G1"
git push
```

Your CTA buttons will update from "Affiliate Link Pending" to "View on AliExpress →" automatically.

## Important: Never Invent Affiliate URLs

- Leave `affiliate_url:` blank if you don't have a link yet
- **Never** type or guess s.click URLs — they won't work and may violate ToS
- The site gracefully handles empty affiliate_url fields with a placeholder button

## File Structure

```
affiliate.txt              # Source of truth — edit this to add affiliate links
data/products.json         # Generated from affiliate.txt (site reads this)
parse-affiliate.js         # Converts affiliate.txt → products.json
LINKS.md                   # Checklist for tracking affiliate link status
index.html                 # Main page
styles.css                 # Dark streaming theme CSS
app.js                     # Product rendering logic
images/                    # Optional: mirror product images here
README.md                  # This file
```

## Product Data Fields

Each product in `affiliate.txt` uses these fields:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique slug (e.g. `kinhank-g1`) |
| `rank` | Yes | Display order (1 = top) |
| `name` | Yes | Product name |
| `brand` | Yes | Manufacturer |
| `short_description` | Recommended | Short blurb from AliExpress listing |
| `os`, `soc`, `ram_gb`, `storage_gb` | Yes | Technical specs |
| `widevine` | Yes | Should be "L1" for all certified devices |
| `netflix_max` | Yes | "1080p" or "4K" |
| `prime_native` | Yes | "yes" for certified devices |
| `google_certified` | Yes | "yes" for certified devices |
| `wifi`, `hdr` | Yes | Connectivity and video specs |
| `score_overall`, `score_streaming`, `score_value`, `score_build` | Yes | Numerical scores (0-10) |
| `best_for` | Optional | Set to "AliExpress" to show special badge |
| `pros`, `cons`, `dos`, `donts` | Yes | Buying guidance |
| `product_url` | Optional | Direct AliExpress item link (non-affiliate) |
| `image_url` | Optional | Product image URL (AliExpress CDN or other) |
| `image_local` | Optional | Path to mirrored image (e.g. `images/kinhank-g1.jpg`) |
| `aliexpress_search` | Yes | Fallback search query |
| `affiliate_url` | **Important** | Your s.click affiliate link (leave blank until you have it) |
| `notes` | Optional | Additional context |

## Deployment

### GitHub Pages (Recommended)

1. Push your changes to `main` (or your default branch)
2. Go to **Settings → Pages**
3. Source: **Branch: main**, **Folder: / (root)**
4. Click **Save**
5. Site goes live at `https://your-username.github.io/your-repo-name/`

### Local Testing

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### Other Hosts

The site is pure static HTML/CSS/JS. Host it anywhere:
- Netlify (drag & drop)
- Vercel (Git import)
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static file host

## Design Features

### Dark Streaming Theme
- Near-black background (#0b0d10)
- Elevated cards (#14181f)
- Electric teal/cyan accents (#2ee6a6, #3dffa8)
- High contrast for readability
- Subtle gradient header with accent line

### Mobile-First Layout
- Primary: Vertical comparison cards with images and key specs
- Secondary: Horizontal scrollable comparison table (shows on tablet+)
- Collapsible "Show Buying Tips" on mobile (auto-expanded on desktop)
- Large tap targets (48px+)
- Sticky nav with minimal items

### Score Color Coding
- **Green** (9.0+): High score
- **Yellow** (8.0-8.9): Medium score
- **Red** (<8.0): Low score

### Special Badges
- "Best for AliExpress" badge on Kinhank G1 (set via `best_for: AliExpress` field)
- Top-3 rank badges have special teal glow on mobile cards

## Customization

### Change Accent Color

Edit `styles.css`:
```css
:root {
  --accent-teal: #2ee6a6;           /* Main accent */
  --accent-teal-bright: #3dffa8;    /* Hover/highlight */
  --accent-teal-dim: #1fa574;       /* Subtle borders */
}
```

### Adjust Score Thresholds

Edit `app.js`:
```javascript
function getScoreClass(score) {
  if (score >= 9.0) return 'high';      // Green
  if (score >= 8.0) return 'medium';    // Yellow
  return 'low';                          // Red
}
```

### Add Product Images

**Image sources:** Use official product images from Amazon, Google Store, Xiaomi, or Walmart — **not** AliExpress (AliExpress scraping is blocked by captcha).

**Option 1: Mirror into repo (RECOMMENDED)**
1. Download official product images from sources documented in `images/README.md`
2. Save to `images/<product-id>.jpg` (or `.webp` or `.png`)
3. Images are already referenced in `affiliate.txt` via `image_local: images/<id>.jpg`
4. Commit and push

**Option 2: Hotlink (fallback)**
- Set `image_url:` in `affiliate.txt` to an official image URL
- Less reliable (host may block hotlinking)

See `images/README.md` for specific image sources for each product.

### Add Product Videos (Optional)

**Video support:** Site can display short product demonstration videos instead of static images.

**When video files arrive:**
1. Copy to `videos/<product-id>.mp4`
2. Update `affiliate.txt`:
   ```
   video_local: videos/xiaomi-tv-box-s-3rd-gen.mp4
   ```
3. Run `node parse-affiliate.js`
4. Commit and push

**Video display:**
- Muted autoplay loop on product cards
- Videos take priority over images (shows video if both available)
- Graceful fallback if video fails to load
- Recommended: 5-15 second clips, under 5MB, 720p or 1080p

See `videos/README.md` for format specs and examples.

## Legal & Compliance

### Affiliate Disclosure
The site includes an FTC-compliant affiliate disclaimer in the footer:

> **Affiliate Disclosure:** Links on this site may earn us a commission if you make a purchase. This helps support our testing and review work at no extra cost to you.

**Do not remove this.** It's required by FTC guidelines and most affiliate programs.

### Certification Requirements
Only include devices that **genuinely meet** the requirements:
- Widevine L1 certified
- Google Play Certified (Android TV) or Google TV certified
- Native Netflix app with 1080p or 4K support
- Native Amazon Prime Video app

Do not add uncertified devices or devices that require sideloading streaming apps.

## Tracking Affiliate Link Status

See `LINKS.md` for a checklist of which products have affiliate links configured.

Quick check:
```bash
grep -A 1 "^id:" affiliate.txt | grep -E "(^id:|^affiliate_url:)"
```

Or just view the site — products without affiliate links show a "Affiliate Link Pending" placeholder button.

## Troubleshooting

### Products not showing?
1. Check `data/products.json` exists and contains valid JSON
2. Re-run `node parse-affiliate.js`
3. Check browser console for errors
4. Verify `affiliate.txt` syntax (use `---` separators, `key: value` format)

### Affiliate links not working?
1. Verify URL starts with `https://s.click.aliexpress.com/`
2. Test link in incognito browser
3. Check your AliExpress affiliate account status
4. Some products may not have links — that's okay, fallback button shows

### Images not loading?
1. Check `image_url` or `image_local` in `affiliate.txt`
2. If hotlinking from CDN, the host may block it — mirror images to `images/` instead
3. Images fail gracefully (they just don't show up)

### Local file:// access issues?
Modern browsers block `fetch()` from `file://` URLs. Use a local web server:
```bash
python3 -m http.server 8000
```

## Tech Stack

- Pure static HTML/CSS/JavaScript (no framework)
- No build step required (optional `parse-affiliate.js` to regenerate JSON)
- Mobile-first responsive design
- Dark theme optimized for accessibility (WCAG contrast)
- GitHub Pages ready

## Support

- **Product certification:** Check official Google/Netflix certification databases
- **AliExpress affiliate program:** [AliExpress Portals](https://portals.aliexpress.com/)
- **GitHub Pages:** [GitHub Pages docs](https://docs.github.com/en/pages)

## License

See the `LICENSE` file in this repository.

---

**Built for transparency. Certified devices only. Dark theme. Mobile-first.**
