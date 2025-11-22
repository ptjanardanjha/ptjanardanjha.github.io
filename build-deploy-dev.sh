#!/bin/bash

# Ensure script exits on error
set -e

echo "Building app..."
npm run build
# cp -r dist/admiro/browser/. /home/xorz/docker-data/xorz-nginx/nginx-data/html/dev/khata/
# rm -rf dist
rm -rf /home/xorz/docker-data/xorz-nginx/nginx-data/html/dev/poojajyotish/
mkdir -p /home/xorz/docker-data/xorz-nginx/nginx-data/html/dev/poojajyotish/
mv dist/* /home/xorz/docker-data/xorz-nginx/nginx-data/html/dev/poojajyotish/
