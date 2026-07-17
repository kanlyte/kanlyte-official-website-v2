#!/usr/bin/env bash
# Builds a self-contained Next.js "standalone" bundle for cPanel (Passenger/Node.js Selector)
# and packages it into a tarball you can upload and extract in your cPanel app directory.
#
# Usage:
#   bash scripts/build-cpanel.sh
#
# Output:
#   dist/standalone/        - the folder to deploy (contains server.js)
#   dist/oyster-standalone.tar.gz - tarball of the same, for easy upload

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> Cleaning previous build output"
rm -rf .next dist
mkdir -p dist

echo "==> Installing dependencies"
npm install

echo "==> Generating Prisma client"
npx prisma generate

echo "==> Building Next.js (standalone output)"
npx next build

if [ ! -d ".next/standalone" ]; then
  echo "ERROR: .next/standalone was not created. Check that next.config.ts has output: 'standalone'." >&2
  exit 1
fi

echo "==> Assembling standalone bundle"
cp -r .next/standalone dist/standalone
mkdir -p dist/standalone/.next
cp -r .next/static dist/standalone/.next/static
cp -r public dist/standalone/public

# Next.js copies .env* files into the standalone output automatically. Strip them
# so real secrets never end up inside the uploaded tarball -- set env vars via the
# cPanel Node.js App UI instead (see step 3 below).
find dist/standalone -maxdepth 1 -name ".env*" -exec rm -f {} +

# Prisma's query engine is a native binary; make sure it's executable in the bundle.
find dist/standalone -name "query_engine-*" -o -name "*.so.node" 2>/dev/null | while read -r f; do
  chmod +x "$f" || true
done

echo "==> Creating tarball"
tar -czf "dist/oyster-standalone.tar.gz" -C dist/standalone .

echo ""
echo "Build complete."
echo ""
echo "Next steps on cPanel:"
echo "  1. Upload dist/oyster-standalone.tar.gz to your app's directory and extract it there:"
echo "       tar -xzf oyster-standalone.tar.gz"
echo "  2. In cPanel 'Setup Node.js App', set:"
echo "       Application root:    <the folder you extracted into>"
echo "       Application startup file: server.js"
echo "  3. Set your environment variables (DATABASE_URL, etc.) in the cPanel Node.js App UI"
echo "     rather than bundling a .env file."
echo "  4. Verify the server's OS/OpenSSL matches the Prisma binaryTargets in prisma/schema.prisma"
echo "     (run 'cat /etc/os-release' and 'openssl version' in the cPanel terminal). Adjust"
echo "     binaryTargets there and re-run this script if the engine still fails to load."
echo "  5. Restart the app from the cPanel Node.js App UI."
