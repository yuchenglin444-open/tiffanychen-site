#!/usr/bin/env python3
"""Re-download low-res images using the best available resolution from detail pages."""

import re
import os
import subprocess

def download_image(url, filepath):
    """Download an image, return True if successful."""
    try:
        result = subprocess.run(
            ["curl", "-sL", "-o", filepath, "-w", "%{http_code}", url],
            capture_output=True, text=True, timeout=60
        )
        if result.stdout.strip() == "200" and os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            return True
        if os.path.exists(filepath):
            os.remove(filepath)
        return False
    except:
        if os.path.exists(filepath):
            os.remove(filepath)
        return False

def get_image_dims(filepath):
    """Get (width, height) using sips."""
    try:
        result = subprocess.run(
            ["sips", "-g", "pixelWidth", "-g", "pixelHeight", filepath],
            capture_output=True, text=True, timeout=10
        )
        w = re.search(r'pixelWidth:\s*(\d+)', result.stdout)
        h = re.search(r'pixelHeight:\s*(\d+)', result.stdout)
        return (int(w.group(1)) if w else 0, int(h.group(1)) if h else 0)
    except:
        return (0, 0)

def get_artwork_image_url(html):
    """Extract the artwork image URL (not the page cover/background).

    The artwork image is the one that has multiple size variants (_rw_1920, _rw_600, etc).
    The page cover only appears as _rwc_ with no other variants.
    Priority: _rw_1920 > base UUID > _rw_1200 > _rw_600
    """
    # Find all CDN image URLs with auth hashes
    urls = []
    for match in re.finditer(
        r'(https://cdn\.myportfolio\.com/ff5f2b2d[^"\'<>\s]+\.(?:jpg|jpeg|png|JPG|JPEG|PNG)\?h=[a-f0-9]+)',
        html
    ):
        url = match.group(1)
        if '_carw_' in url or '_rwc_' in url:
            continue
        urls.append(url)

    if not urls:
        return None

    # Group by base UUID to find the artwork (has multiple variants)
    uuid_variants = {}
    for url in urls:
        # Extract UUID part
        m = re.search(r'/([a-f0-9]{8}-[a-f0-9-]+?)(?:_rw_\d+)?\.', url)
        if m:
            uuid = m.group(1)
            if uuid not in uuid_variants:
                uuid_variants[uuid] = []
            uuid_variants[uuid].append(url)

    # Find the UUID with the most variants (that's the artwork, not the cover)
    best_uuid = max(uuid_variants, key=lambda u: len(uuid_variants[u])) if uuid_variants else None
    if not best_uuid:
        return urls[0]  # fallback

    variants = uuid_variants[best_uuid]

    # Priority: _rw_1920 > base > _rw_1200 > _rw_600
    for variant in variants:
        if '_rw_1920' in variant:
            return variant
    for variant in variants:
        if '_rw_' not in variant:
            return variant  # base URL
    for variant in variants:
        if '_rw_1200' in variant:
            return variant
    return variants[0]


# Images to fix, grouped by what we need to do
IMAGES = {
    # Gouache - originals were low-res (400-650px), best available from CDN
    "public/images/gouache/27-untitled-18.jpg": "untitled-15",
    "public/images/gouache/44-lotes.jpg": "lotes",
    "public/images/gouache/46-untitled-28.jpg": "untitled-33",
    "public/images/gouache/47-untitled-29.jpg": "untitled-21",
    "public/images/gouache/48-monk.jpg": "old-man",
    "public/images/gouache/49-untitled-30.jpg": "untitled-17",
    "public/images/gouache/50-swan.jpg": "swan",
    "public/images/gouache/52-untitled-32.jpg": "untitled-18",
    "public/images/gouache/53-untitled-33.jpg": "untitled-3",
    "public/images/gouache/55-untitled-35.jpg": "untitled-19",
    "public/images/gouache/59-untitled-36.jpg": "untitled-12",
    "public/images/gouache/70-untitled-43.jpg": "untitled-20",
    "public/images/gouache/74-wild-lily-spring.jpg": "161015d649e4b2",
    # Paintings
    "public/images/paintings/09-portrait-1.jpg": "portrait-5",
    # Sculptures
    "public/images/sculptures/06-chen-huomu.jpg": "george-w-bush-1",
    "public/images/sculptures/07-unknown.jpg": "untitled-27",
    "public/images/sculptures/08-li-jianzhong.jpg": "untitled-26",
    "public/images/sculptures/10-lin-tianfu.jpg": "portrait-4",
}

print(f"=== Re-downloading {len(IMAGES)} images ===\n")

success = 0
failed = 0

for target_path, slug in IMAGES.items():
    url = f"https://tiffanychen.site/{slug}"
    try:
        result = subprocess.run(["curl", "-sL", url], capture_output=True, text=True, timeout=30)
        html = result.stdout
    except:
        print(f"  FAIL (fetch error): {target_path}")
        failed += 1
        continue

    img_url = get_artwork_image_url(html)
    if not img_url:
        print(f"  FAIL (no image URL): {target_path}")
        failed += 1
        continue

    temp_path = target_path + ".tmp"
    if download_image(img_url, temp_path):
        w, h = get_image_dims(temp_path)
        size = os.path.getsize(temp_path)
        size_str = f"{size/1024/1024:.1f}MB" if size > 1024*1024 else f"{size//1024}KB"
        os.replace(temp_path, target_path)
        print(f"  OK: {os.path.basename(target_path):30s} -> {w}x{h} [{size_str}]")
        success += 1
    else:
        print(f"  FAIL (download): {target_path}")
        if os.path.exists(temp_path):
            os.remove(temp_path)
        failed += 1

print(f"\n=== Done: {success} updated, {failed} failed ===")
