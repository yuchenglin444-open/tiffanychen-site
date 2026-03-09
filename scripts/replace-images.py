#!/usr/bin/env python3
"""Replace thumbnail images with high-res versions using the mapping files."""

import json
import os
import shutil

HIGHRES_DIR = "scrape-work/highres-images"

categories = {
    'gouache': 'public/images/gouache',
    'paintings': 'public/images/paintings',
    'sculptures': 'public/images/sculptures',
    'others': 'public/images/others',
}

total_replaced = 0
total_skipped = 0

for cat, target_dir in categories.items():
    mapping_file = f"scrape-work/{cat}-mapping.json"
    with open(mapping_file) as f:
        mapping = json.load(f)

    print(f"\n=== {cat.upper()} ({len(mapping)} images) ===")

    for entry in mapping:
        src = os.path.join(HIGHRES_DIR, entry['highres_file'])
        dst = os.path.join(target_dir, entry['target_file'])

        if not entry['exists']:
            print(f"  SKIP (no highres): {entry['target_file']}")
            total_skipped += 1
            continue

        src_size = os.path.getsize(src)
        dst_size = os.path.getsize(dst) if os.path.exists(dst) else 0

        # Copy high-res image to replace thumbnail
        shutil.copy2(src, dst)

        src_str = f"{src_size/1024/1024:.1f}M" if src_size > 1024*1024 else f"{src_size//1024}K"
        dst_str = f"{dst_size/1024/1024:.1f}M" if dst_size > 1024*1024 else f"{dst_size//1024}K"

        print(f"  [{entry['index']:2d}] {entry['target_file']} : {dst_str} -> {src_str}")
        total_replaced += 1

print(f"\n=== Done ===")
print(f"Replaced: {total_replaced}")
print(f"Skipped: {total_skipped}")
