#!/bin/bash

# Ensure script exits on error
set -e

echo "Building app..."
npm run build
rm -rf /home/xorz/docker-data/xorz-nginx/nginx-data/html/prod/poojajyotish/
mkdir -p /home/xorz/docker-data/xorz-nginx/nginx-data/html/prod/poojajyotish/
mv dist/* /home/xorz/docker-data/xorz-nginx/nginx-data/html/prod/poojajyotish/
