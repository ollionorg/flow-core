#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

yarn analyze
cd "../custom-elements-manifest-vue"
yarn build
cd .. && cd "./flow-core"
echo "synchronizing colors from figma..."
yarn sync-colors
echo "building library..."
vite build --emptyOutDir && tsc -emitDeclarationOnly
echo "generating types..."
node generate-types.js 