#!/usr/bin/env bash
# sync-webmcp.sh — Copy shared WebMCP assets from miniclaw plugins to this project.
# Run after updating shared/webmcp/ in the miniclaw plugins directory.
#
# Source: ~/.openclaw/miniclaw/plugins/shared/webmcp/
# Target: public/

set -euo pipefail

SHARED_DIR="${HOME}/.openclaw/miniclaw/plugins/shared/webmcp"
PUBLIC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public"

if [ ! -d "$SHARED_DIR" ]; then
  echo "ERROR: Shared WebMCP directory not found at $SHARED_DIR" >&2
  exit 1
fi

# Copy the core library (always sync from shared — do not modify locally)
cp "$SHARED_DIR/webmcp-tools.js" "$PUBLIC_DIR/webmcp-tools.js"
echo "Synced webmcp-tools.js from shared"

# Copy the .well-known manifest if it exists
if [ -d "$SHARED_DIR/well-known" ]; then
  mkdir -p "$PUBLIC_DIR/.well-known"
  cp "$SHARED_DIR/well-known/"* "$PUBLIC_DIR/.well-known/" 2>/dev/null || true
  echo "Synced .well-known/ assets from shared"
fi

echo "WebMCP sync complete."
