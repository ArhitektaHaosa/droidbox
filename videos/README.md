# Product Videos

This directory contains product demonstration videos for the comparison site.

## Video Handling

Videos are optional — the site works perfectly without them. When available, videos display instead of static images on product cards.

### Video Format
- **Format:** MP4 (H.264)
- **Recommended:** Short clips (5-15 seconds), muted autoplay loop
- **Max size:** Keep under 5MB per video for fast loading
- **Resolution:** 1280x720 or 1920x1080

### Adding Videos

When video files arrive:
1. Copy to this directory: `videos/<product-id>.mp4`
2. Update `affiliate.txt`:
   ```
   video_local: videos/xiaomi-tv-box-s-3rd-gen.mp4
   ```
   Or for remote hosting:
   ```
   video_url: https://cdn-url-here/video.mp4
   ```
3. Run `node parse-affiliate.js` to regenerate `data/products.json`
4. Commit and push

### Display Behavior

- Videos display with **muted autoplay loop** on product cards
- Videos take priority over images when both are available
- If video fails to load, it hides gracefully (no broken player)
- Mobile-friendly `playsinline` attribute for iOS

### Current Status

No videos yet. Site currently displays:
- ✅ 3 products with static images (Xiaomi, Google, onn)
- ⏳ 2 products without media (Kinhank, Mecool)

When videos arrive, they will replace static images on cards automatically.

### Fallback Chain

1. **video_local** (mirrored in repo) — first priority
2. **video_url** (CDN-hosted) — second priority
3. **image_local** (mirrored in repo) — third priority
4. **image_url** (CDN-hosted) — fourth priority
5. **No media** — card displays text-only (graceful)

All levels gracefully degrade — missing media never breaks the layout.
