#!/usr/bin/env python3
"""Fix paintings and sculptures images using correct page URLs and title matching."""

import re
import os
import subprocess
import shutil

HIGHRES_DIR = "scrape-work/highres-images"

def extract_gallery_items(html_path):
    """Extract (slug, title) pairs from gallery HTML."""
    with open(html_path) as f:
        html = f.read()
    section_match = re.search(r'<section class="project-covers">(.*?)</section>', html, re.DOTALL)
    if not section_match:
        return []
    section = section_match.group(1)
    items = re.findall(
        r'project-cover[^>]*href="(/[^"]+)".*?class="title[^"]*"[^>]*>(.*?)</div>',
        section, re.DOTALL
    )
    return [(slug.lstrip('/'), title.strip()) for slug, title in items]

def download_highres(slug):
    """Download high-res image from detail page, return True if successful."""
    filepath = os.path.join(HIGHRES_DIR, f"{slug}.jpg")
    if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
        return True  # Already downloaded

    url = f"https://tiffanychen.site/{slug}"
    try:
        result = subprocess.run(["curl", "-sL", url], capture_output=True, text=True, timeout=30)
        html = result.stdout
    except:
        return False

    # Extract _rw_1920 image URL
    match = re.search(r'https://cdn\.myportfolio\.com/[^"\'<>\s]*_rw_1920\.[^"\'<>\s]+', html)
    if not match:
        match = re.search(r'https://cdn\.myportfolio\.com/[^"\'<>\s]*_rw_\d+\.[^"\'<>\s]+', html)
    if not match:
        return False

    img_url = match.group(0)
    try:
        result = subprocess.run(
            ["curl", "-sL", "-o", filepath, "-w", "%{http_code}", img_url],
            capture_output=True, text=True, timeout=60
        )
        if result.stdout.strip() == "200" and os.path.getsize(filepath) > 1000:
            return True
        else:
            os.remove(filepath)
            return False
    except:
        if os.path.exists(filepath):
            os.remove(filepath)
        return False

# === SCULPTURES (simple - 10 items, direct match) ===
print("=== SCULPTURES ===")
sculpture_items = extract_gallery_items("scrape-work/sculptures-correct/cleaned.html")
sculpture_files = sorted([f for f in os.listdir("public/images/sculptures") if f.endswith('.jpg')])

print(f"Gallery items: {len(sculpture_items)}, Image files: {len(sculpture_files)}")

for i, (slug, title) in enumerate(sculpture_items):
    if i >= len(sculpture_files):
        break
    target = os.path.join("public/images/sculptures", sculpture_files[i])
    # Download if needed
    if download_highres(slug):
        src = os.path.join(HIGHRES_DIR, f"{slug}.jpg")
        src_size = os.path.getsize(src)
        size_str = f"{src_size/1024/1024:.1f}M" if src_size > 1024*1024 else f"{src_size//1024}K"
        shutil.copy2(src, target)
        print(f"  [{i+1:2d}] {sculpture_files[i]:25s} <- {slug} ({title}) [{size_str}]")
    else:
        print(f"  [{i+1:2d}] {sculpture_files[i]:25s} <- FAILED: {slug} ({title})")

# === PAINTINGS (need title matching - 28 on page, 22 in our data) ===
print("\n=== PAINTINGS ===")
painting_items = extract_gallery_items("scrape-work/paintings-correct/cleaned.html")
painting_files = sorted([f for f in os.listdir("public/images/paintings") if f.endswith('.jpg')])

# Our artwork titles in order
our_paintings = [
    ("01-untitled-1.jpg", "Untitled"),
    ("02-untitled-2.jpg", "Untitled"),
    ("03-untitled-3.jpg", "Untitled"),
    ("04-untitled-4.jpg", "Untitled"),
    ("05-untitled-5.jpg", "Untitled"),
    ("06-george-w-bush.jpg", "George W. Bush"),
    ("07-untitled-6.jpg", "Untitled"),
    ("08-untitled-7.jpg", "Untitled"),
    ("09-portrait-1.jpg", "Portrait"),
    ("10-portrait-2.jpg", "Portrait"),
    ("11-portrait-3.jpg", "Portrait"),
    ("12-portrait-jack.jpg", "Portrait - Jack"),
    ("13-untitled-8.jpg", "Untitled"),
    ("14-untitled-9.jpg", "Untitled"),
    ("15-untitled-10.jpg", "Untitled"),
    ("16-untitled-11.jpg", "Untitled"),
    ("17-untitled-12.jpg", "Untitled"),
    ("18-untitled-13.jpg", "Untitled"),
    ("19-untitled-14.jpg", "Untitled"),
    ("20-portrait-4.jpg", "Portrait"),
    ("21-untitled-15.jpg", "Untitled"),
    ("22-romantic-venice.jpg", "浪漫威尼斯"),
]

# Build page items pool with remaining/available items
# Match by position for first 8 (straightforward untitled + george w bush)
# Then match by title for specific entries
remaining_page = list(painting_items)
used_indices = set()

print(f"Gallery items: {len(painting_items)}, Our paintings: {len(our_paintings)}")

# Strategy: go through our paintings and find the best match on the page
# For "Untitled" matches, use position order
# For named pieces, match by title

untitled_page_indices = [i for i, (s, t) in enumerate(painting_items) if t == "Untitled"]
named_matches = {}
for i, (s, t) in enumerate(painting_items):
    if t != "Untitled":
        key = t.strip().rstrip(" -")  # Normalize "Portrait -" to "Portrait"
        if key not in named_matches:
            named_matches[key] = []
        named_matches[key].append(i)

untitled_cursor = 0
for our_file, our_title in our_paintings:
    target = os.path.join("public/images/paintings", our_file)
    matched_idx = None

    if our_title == "Untitled":
        # Use next available untitled from page
        while untitled_cursor < len(untitled_page_indices):
            idx = untitled_page_indices[untitled_cursor]
            untitled_cursor += 1
            if idx not in used_indices:
                matched_idx = idx
                break
    elif our_title == "Portrait - Jack":
        # Look for exact match
        for i, (s, t) in enumerate(painting_items):
            if "Jack" in t and i not in used_indices:
                matched_idx = i
                break
    elif our_title == "Portrait":
        # Match next available portrait
        key = "Portrait"
        if key in named_matches:
            for idx in named_matches[key]:
                if idx not in used_indices:
                    matched_idx = idx
                    break
    elif our_title == "George W. Bush":
        for i, (s, t) in enumerate(painting_items):
            if "George W. Bush" in t and i not in used_indices:
                matched_idx = i
                break
    elif our_title == "浪漫威尼斯":
        for i, (s, t) in enumerate(painting_items):
            if "浪漫威尼斯" in t and i not in used_indices:
                matched_idx = i
                break

    if matched_idx is not None:
        used_indices.add(matched_idx)
        slug, title = painting_items[matched_idx]
        if download_highres(slug):
            src = os.path.join(HIGHRES_DIR, f"{slug}.jpg")
            src_size = os.path.getsize(src)
            size_str = f"{src_size/1024/1024:.1f}M" if src_size > 1024*1024 else f"{src_size//1024}K"
            shutil.copy2(src, target)
            print(f"  {our_file:25s} <- {slug:30s} ({title}) [{size_str}]")
        else:
            print(f"  {our_file:25s} <- FAILED: {slug} ({title})")
    else:
        print(f"  {our_file:25s} <- NO MATCH FOUND")

print("\nDone!")
