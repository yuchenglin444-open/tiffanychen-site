#!/usr/bin/env python3
"""Download high-resolution images from tiffanychen.site detail pages."""

import os
import re
import subprocess
import sys

OUTPUT_DIR = "scrape-work/highres-images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("scrape-work/all-detail-urls.txt") as f:
    urls = [line.strip() for line in f if line.strip()]

total = len(urls)
success = 0
failed = 0

print(f"=== Downloading high-res images from {total} detail pages ===")

for i, url in enumerate(urls, 1):
    slug = url.replace("https://tiffanychen.site/", "")

    # Fetch the detail page HTML
    try:
        result = subprocess.run(
            ["curl", "-sL", url],
            capture_output=True, text=True, timeout=30
        )
        html = result.stdout
    except Exception as e:
        print(f"[{i}/{total}] SKIP (fetch error): {slug}")
        failed += 1
        continue

    if not html:
        print(f"[{i}/{total}] SKIP (empty): {slug}")
        failed += 1
        continue

    # Extract the _rw_1920 image URL
    patterns = [
        r'https://cdn\.myportfolio\.com/[^"\'<>\s]*_rw_1920\.[^"\'<>\s]+',
        r'https://cdn\.myportfolio\.com/[^"\'<>\s]*_rw_1200\.[^"\'<>\s]+',
        r'https://cdn\.myportfolio\.com/[^"\'<>\s]*_rw_\d+\.[^"\'<>\s]+',
    ]

    img_url = None
    for pattern in patterns:
        match = re.search(pattern, html)
        if match:
            img_url = match.group(0)
            break

    if not img_url:
        print(f"[{i}/{total}] SKIP (no high-res URL): {slug}")
        failed += 1
        continue

    # Download the image
    filename = f"{slug.replace('/', '_')}.jpg"
    filepath = os.path.join(OUTPUT_DIR, filename)

    try:
        result = subprocess.run(
            ["curl", "-sL", "-o", filepath, "-w", "%{http_code}", img_url],
            capture_output=True, text=True, timeout=60
        )
        http_code = result.stdout.strip()

        if http_code == "200" and os.path.getsize(filepath) > 1000:
            size = os.path.getsize(filepath)
            size_str = f"{size/1024/1024:.1f}M" if size > 1024*1024 else f"{size//1024}K"
            print(f"[{i}/{total}] OK ({size_str}): {slug}")
            success += 1
        else:
            print(f"[{i}/{total}] FAIL (HTTP {http_code}): {slug}")
            os.remove(filepath)
            failed += 1
    except Exception as e:
        print(f"[{i}/{total}] FAIL (download error): {slug}")
        if os.path.exists(filepath):
            os.remove(filepath)
        failed += 1

print(f"\n=== Done ===")
print(f"Success: {success}")
print(f"Failed: {failed}")
print(f"Total: {total}")
print(f"Output: {OUTPUT_DIR}")
