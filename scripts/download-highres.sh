#!/bin/bash
# Download high-resolution images from tiffanychen.site detail pages
# Each detail page contains a _rw_1920 image URL we can extract and download

set -e

OUTPUT_DIR="scrape-work/highres-images"
mkdir -p "$OUTPUT_DIR"

URLS_FILE="scrape-work/all-detail-urls.txt"
TOTAL=$(wc -l < "$URLS_FILE" | tr -d ' ')
COUNT=0
SUCCESS=0
FAILED=0

echo "=== Downloading high-res images from $TOTAL detail pages ==="

while IFS= read -r url; do
    COUNT=$((COUNT + 1))
    SLUG=$(echo "$url" | sed 's|https://tiffanychen.site/||')

    # Fetch the detail page HTML
    HTML=$(curl -sL "$url" 2>/dev/null)

    if [ -z "$HTML" ]; then
        echo "[$COUNT/$TOTAL] SKIP (empty): $SLUG"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Extract the _rw_1920 image URL (the high-res version)
    IMG_URL=$(echo "$HTML" | grep -o 'https://cdn\.myportfolio\.com/[^"]*_rw_1920\.[^"?]*?h=[^"]*' | head -1)

    if [ -z "$IMG_URL" ]; then
        # Try _rw_1200 as fallback
        IMG_URL=$(echo "$HTML" | grep -o 'https://cdn\.myportfolio\.com/[^"]*_rw_1200\.[^"?]*?h=[^"]*' | head -1)
    fi

    if [ -z "$IMG_URL" ]; then
        # Try any large _rw_ image
        IMG_URL=$(echo "$HTML" | grep -o 'https://cdn\.myportfolio\.com/[^"]*_rw_[0-9]*\.[^"?]*?h=[^"]*' | head -1)
    fi

    if [ -z "$IMG_URL" ]; then
        echo "[$COUNT/$TOTAL] SKIP (no high-res URL): $SLUG"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Extract filename from slug
    FILENAME="${SLUG}.jpg"

    # Download the image
    HTTP_CODE=$(curl -sL -w "%{http_code}" -o "$OUTPUT_DIR/$FILENAME" "$IMG_URL" 2>/dev/null)

    if [ "$HTTP_CODE" = "200" ]; then
        SIZE=$(ls -lh "$OUTPUT_DIR/$FILENAME" | awk '{print $5}')
        echo "[$COUNT/$TOTAL] OK ($SIZE): $SLUG"
        SUCCESS=$((SUCCESS + 1))
    else
        echo "[$COUNT/$TOTAL] FAIL (HTTP $HTTP_CODE): $SLUG"
        rm -f "$OUTPUT_DIR/$FILENAME"
        FAILED=$((FAILED + 1))
    fi
done < "$URLS_FILE"

echo ""
echo "=== Done ==="
echo "Success: $SUCCESS"
echo "Failed: $FAILED"
echo "Total: $COUNT"
echo "Output: $OUTPUT_DIR"
