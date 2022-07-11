#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

yarn analyze
cd "../custom-elements-manifest-vue"
yarn build
cd .. && cd "./flow-core"
echo "generating types..."
node generate-types.js 
echo "building library..."
vite build --emptyOutDir && tsc -emitDeclarationOnly