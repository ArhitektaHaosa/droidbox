# Affiliate Links Status

Track your AliExpress affiliate link setup progress here.

## Quick Reference

**How to add links:**
1. Get your `s.click.aliexpress.com` affiliate URL from the AliExpress Affiliate Program
2. Open `affiliate.txt` and paste the URL on the `affiliate_url:` line for that product
3. Run `node parse-affiliate.js` to regenerate `data/products.json`
4. Commit and push — your site updates automatically

## Product Checklist

| ID | Product Name | Affiliate Link Status | Notes |
|----|--------------|----------------------|-------|
| `kinhank-g1` | Kinhank G1 | ❌ Pending | Best AliExpress pick — prioritize this one |
| `xiaomi-tv-box-s-3rd-gen` | Xiaomi TV Box S (3rd Gen) | ❌ Pending | Top performer, check official sellers |
| `google-tv-streamer-4k` | Google TV Streamer 4K | ❌ Pending | Limited AliExpress presence, may stay empty |
| `mecool-km2-plus` | Mecool KM2 Plus | ❌ Pending | Budget option |
| `onn-4k-plus-google-tv` | onn. 4K Plus | ❌ Pending | US retail (Walmart), weak AliExpress coverage |

## Status Legend

- ✅ **Configured** — Affiliate URL added and live on site
- ❌ **Pending** — No affiliate URL yet (CTA shows "Affiliate Link Pending" button)
- ⚠️ **N/A** — Product not available on AliExpress (fallback search link shows instead)

## Tips

- Focus on `kinhank-g1` and `xiaomi-tv-box-s-3rd-gen` first — these have the best AliExpress presence
- Google TV Streamer and onn. boxes may never get affiliate links due to limited AliExpress availability
- Always use `s.click.aliexpress.com` format — never invent or modify these URLs
- Test your affiliate links in an incognito browser after adding them

## Checking Current Status

Run this to see which products have affiliate URLs configured:

```bash
grep -A 1 "^id:" affiliate.txt | grep -E "(^id:|^affiliate_url:)"
```

Or just view the live site and look for "Affiliate Link Pending" buttons.
