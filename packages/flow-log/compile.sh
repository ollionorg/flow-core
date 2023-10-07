
#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

pnpm run analyze
cd "../custom-elements-manifest-to-types"
pnpm run build
cd .. && cd "./flow-log"

echo "building library..."
vite build --emptyOutDir && tsc -emitDeclarationOnly
echo "generating types..."
node generate-types.js