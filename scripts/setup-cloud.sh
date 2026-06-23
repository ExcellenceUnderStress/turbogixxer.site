#!/usr/bin/env sh
set -eu

echo "Node: $(node --version)"
echo "npm: $(npm --version)"

target_node=""
if [ -f .nvmrc ]; then
  target_node="$(tr -d '[:space:]' < .nvmrc)"
fi

node_major="$(node -p "process.versions.node.split('.')[0]")"
if [ -n "$target_node" ] && [ "$node_major" != "$target_node" ]; then
  echo "Warning: this repo targets Node $target_node via .nvmrc. Pin the cloud environment runtime to match." >&2
fi

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
