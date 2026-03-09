#!/usr/bin/env python3
"""Verify image mappings by extracting titles from gallery HTML."""

import re

categories = {
    'gouache': 'scrape-work/gouache/cleaned.html',
    'paintings': 'scrape-work/paintings/cleaned.html',
    'sculptures': 'scrape-work/sculptures/cleaned.html',
    'others': 'scrape-work/others/cleaned.html',
}

for cat, path in categories.items():
    with open(path) as f:
        html = f.read()

    # Extract pairs of (slug, title) from gallery items
    # Pattern: <a ... href="/slug"> ... <div class="title ...">Title</div>
    section_match = re.search(r'<section class="project-covers">(.*?)</section>', html, re.DOTALL)
    if not section_match:
        continue

    section = section_match.group(1)

    # Find all project-cover blocks
    items = re.findall(
        r'project-cover[^>]*href="(/[^"]+)".*?class="title[^"]*"[^>]*>(.*?)</div>',
        section, re.DOTALL
    )

    print(f"\n=== {cat.upper()} ({len(items)} items on page) ===")
    for i, (slug, title) in enumerate(items, 1):
        title_clean = title.strip()
        print(f"  [{i:2d}] {slug:30s} -> {title_clean}")
