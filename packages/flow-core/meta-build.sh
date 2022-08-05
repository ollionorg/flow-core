#!/bin/bash

HERE=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$HERE"

yarn analyze
cd "../custom-elements-manifest-vue"
yarn build
cd .. && cd "./flow-core"
node generate-types.js 
yarn sync-colors