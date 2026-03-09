#!/usr/bin/env python3
"""Map downloaded high-res images to artwork entries by parsing gallery HTML structure."""

import re
import json
import os

# Parse gallery pages to get the ordered mapping: position -> detail_slug -> image_url
# The gallery HTML has: <a class="project-cover" href="/slug"> followed by <img> with the thumbnail

categories = {
    'gouache': 'scrape-work/gouache/cleaned.html',
    'paintings': 'scrape-work/paintings/cleaned.html',
    'sculptures': 'scrape-work/sculptures/cleaned.html',
    'others': 'scrape-work/others/cleaned.html',
}

# Our artwork filenames by category
artwork_files = {
    'gouache': [f"{i:02d}" for i in range(1, 75)],
    'paintings': [f"{i:02d}" for i in range(1, 23)],
    'sculptures': [f"{i:02d}" for i in range(1, 11)],
    'others': [f"{i:02d}" for i in range(1, 10)],
}

image_dirs = {
    'gouache': 'public/images/gouache',
    'paintings': 'public/images/paintings',
    'sculptures': 'public/images/sculptures',
    'others': 'public/images/others',
}

for cat, html_path in categories.items():
    print(f"\n=== {cat.upper()} ===")

    with open(html_path) as f:
        html = f.read()

    # Find all project-cover links within the gallery section
    # Pattern: <a class="project-cover ..." href="/slug">
    # We need to find them in order (position matters)

    # Find the project-covers section
    section_match = re.search(r'<section class="project-covers">(.*?)</section>', html, re.DOTALL)
    if not section_match:
        print(f"  Could not find project-covers section")
        continue

    section_html = section_match.group(1)

    # Extract detail page slugs in order
    detail_slugs = re.findall(r'project-cover[^>]*href="(/[^"]+)"', section_html)

    print(f"  Found {len(detail_slugs)} detail page links")

    # Get current image files in order
    current_dir = image_dirs[cat]
    if os.path.exists(current_dir):
        current_files = sorted([f for f in os.listdir(current_dir) if f.endswith('.jpg')])
        print(f"  Current image files: {len(current_files)}")
    else:
        current_files = []

    # Map detail slugs to high-res images
    highres_dir = "scrape-work/highres-images"
    mapped = 0
    missing = 0

    for i, slug in enumerate(detail_slugs):
        slug_clean = slug.lstrip('/')
        highres_file = os.path.join(highres_dir, f"{slug_clean}.jpg")

        if i < len(current_files):
            target_file = os.path.join(current_dir, current_files[i])
            if os.path.exists(highres_file):
                mapped += 1
            else:
                missing += 1
                print(f"  [{i+1}] MISSING highres: {slug_clean} -> {current_files[i]}")
        else:
            print(f"  [{i+1}] Extra detail page (no matching artwork): {slug_clean}")

    print(f"  Mapped: {mapped}, Missing: {missing}")

    # Create the mapping file
    mapping = []
    for i, slug in enumerate(detail_slugs):
        if i < len(current_files):
            slug_clean = slug.lstrip('/')
            highres_file = f"{slug_clean}.jpg"
            target_file = current_files[i]
            mapping.append({
                'index': i + 1,
                'detail_slug': slug_clean,
                'highres_file': highres_file,
                'target_file': target_file,
                'exists': os.path.exists(os.path.join(highres_dir, highres_file))
            })

    with open(f'scrape-work/{cat}-mapping.json', 'w') as f:
        json.dump(mapping, f, indent=2)

    print(f"  Mapping saved to scrape-work/{cat}-mapping.json")
