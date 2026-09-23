# Product Images

This directory contains product images for the comparison site.

## Current Image Status

### ✅ Images Present

#### Xiaomi TV Box S (3rd Gen)
- **Status:** ✅ Available
- **File:** `xiaomi-tv-box-s-3rd-gen.jpg` (298KB)
- **Source:** Official Xiaomi Global site
- **URL:** https://www.mi.com/global/product/xiaomi-tv-box-s-3rd-gen/
- **CDN:** https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-tv-box-s-3rd-gen/pc/zewsxdrcftvgybhnj.jpg

#### Google TV Streamer 4K
- **Status:** ✅ Available
- **File:** `google-tv-streamer-4k.png` (77KB)
- **Source:** Official Google Store
- **URL:** https://store.google.com/product/google_tv_streamer?hl=en-US
- **CDN:** https://lh3.googleusercontent.com/TQ3VHKHdvlpjlbE3woohVYFJrVBUgcVrCtHJN2xVFzkXEHNbqEiy1gS7vnxgUwHnRspROwVDgNWPUEWRxfCZC4j4mDaQD7DOACLe=s0

#### onn. 4K Plus Streaming Box
- **Status:** ✅ Available
- **File:** `onn-4k-plus-google-tv.png` (359KB)
- **Source:** Walmart official listing
- **URL:** https://www.walmart.com/ip/ONN-4K-PLUS/15557424949
- **CDN:** https://i5.walmartimages.com/seo/ONN-4K-PLUS_5cb8886c-a762-4c9d-9b20-afd321c48db6.8223bc997501199a69425a56229f8d01.png

### ⏳ Images Pending

#### Kinhank G1
- **Status:** ⏳ Pending
- **File:** `kinhank-g1.jpg` (not yet available)
- **Note:** Amazon search did not surface exact G1 product listing
- **Reference:** https://www.amazon.com/s?k=Kinhank+G1+Netflix+certified
- **Placeholder:** Site will gracefully handle missing image (card displays without photo)

#### Mecool KM2 Plus
- **Status:** ⏳ Pending
- **File:** `mecool-km2-plus.jpg` (not yet available)
- **Note:** Amazon search did not surface exact KM2 Plus product image
- **Reference:** https://www.amazon.com/s?k=Mecool+KM2+Plus+Netflix+certified
- **Official:** https://www.mecool.com/products/tv-box-mecool-km2-plus
- **Placeholder:** Site will gracefully handle missing image (card displays without photo)

## Image Handling

The site's JavaScript (`app.js`) handles missing images gracefully:
- Images with `onerror="this.style.display='none'"` hide automatically if file not found
- Product cards display properly with or without images
- No broken image icons or layout issues

## Adding More Images

When additional images arrive:
1. Copy to this directory with the exact filename from `affiliate.txt` (e.g., `kinhank-g1.jpg`)
2. Update `affiliate.txt` with `image_local: images/<filename>`
3. Run `node parse-affiliate.js` to regenerate `data/products.json`
4. Commit and push

## Image Sources

All images are from official brand or retail sources:
- **NOT** from AliExpress (scraping blocked by captcha)
- From Amazon, Google Store, Xiaomi official, or Walmart
- Product URLs and CDN URLs documented in `affiliate.txt` and `data/products.json`
