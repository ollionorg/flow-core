
#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

yarn analyze
cd "../custom-elements-manifest-to-types"
yarn build
cd .. && cd "./flow-log"

echo "building library..."
vite build --emptyOutDir && tsc -emitDeclarationOnly
echo "generating types..."
node generate-types.js 