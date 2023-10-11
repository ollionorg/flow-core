
#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

pnpm run analyze

echo "building library..."
pnpm vite build --emptyOutDir
