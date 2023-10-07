#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

pnpm run analyze

echo "building library..."
vite build --emptyOutDir && tsc -emitDeclarationOnly
echo "generating types..."
node generate-types.js
