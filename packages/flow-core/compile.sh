#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

pnpm run analyze
cd "../custom-elements-manifest-to-types"
pnpm run build
cd .. && cd "./flow-core"

# echo "synchronizing colors from figma..."
# pnpm run sync-colors
echo "building library..."
vite build --emptyOutDir && vite build --emptyOutDir --config vite.umd.config.ts && tsc -emitDeclarationOnly
echo "generating types..."
node generate-types.js