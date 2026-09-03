#!/bin/bash
# Automatically checkpoint Hermes source and UI customizations.
set -euo pipefail

REPO="/Users/apple/.hermes/hermes-agent"
BRANCH="custom-hermes-ui"
LOCK="${TMPDIR:-/tmp}/hermes-customizations-autosave.lock"
SNAPSHOT_DIR="$REPO/customizations"

# macOS does not ship the Linux `flock` utility. mkdir is an atomic lock.
if ! mkdir "$LOCK" 2>/dev/null; then exit 0; fi
trap 'rmdir "$LOCK" 2>/dev/null || true' EXIT

cd "$REPO"
[ "$(git branch --show-current)" = "$BRANCH" ] || exit 0

# Keep the external, update-safe customizations versioned in the same branch.
mkdir -p "$SNAPSHOT_DIR"
if [ -f "$HOME/.hermes/skins/claude-inspired.yaml" ]; then
  cp "$HOME/.hermes/skins/claude-inspired.yaml" "$SNAPSHOT_DIR/claude-inspired.yaml"
fi
if [ -d "$HOME/.hermes/desktop-plugins/claude-inspired-theme" ]; then
  rm -rf "$SNAPSHOT_DIR/claude-inspired-theme"
  cp -R "$HOME/.hermes/desktop-plugins/claude-inspired-theme" "$SNAPSHOT_DIR/claude-inspired-theme"
fi

# Track source/UI changes and the mirrored customization files, but never build
# output, dependencies, credentials, or the Hermes profile configuration.
git add -u -- agent hermes_cli tools apps/desktop/src apps/desktop/context-statusbar-options.html
while IFS= read -r path; do
  [ -n "$path" ] && git add -- "$path"
done < <(git ls-files --others --exclude-standard -- agent hermes_cli tools apps/desktop/src apps/desktop/context-statusbar-options.html)
if [ -f "$SNAPSHOT_DIR/claude-inspired.yaml" ]; then git add -- "$SNAPSHOT_DIR/claude-inspired.yaml"; fi
if [ -d "$SNAPSHOT_DIR/claude-inspired-theme" ]; then git add -- "$SNAPSHOT_DIR/claude-inspired-theme"; fi

if git diff --cached --quiet; then
  exit 0
fi

STAMP="$(date '+%Y-%m-%d %H:%M:%S %z')"
git commit -m "Autosave Hermes customizations ($STAMP)" >/dev/null
