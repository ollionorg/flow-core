#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

yarn analyze
cd "../custom-elements-manifest-to-types"
yarn build
cd .. && cd "./flow-core"

# echo "synchronizing colors from figma..."
# yarn sync-colors
echo "building library..."
vite build --emptyOutDir & vite build --emptyOutDir --config vite.umd.config.ts && tsc -emitDeclarationOnly 
echo "generating types..."
node generate-types.js 
