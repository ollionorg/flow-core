SHELL:=/bin/bash

ifeq ($(shell which node),)
$(error NodeJS is not installed. Please make sure you have NodeJS > 18.12 installed.)
endif

ifeq ($(shell which pnpm),)
$(error pnpm is not installed. Please make sure you install it by corepack enable && corepack prepare pnpm@7.26.3 --activate.)
endif

.PHONY: install
install:
	pnpm install

.PHONY: build
build: install
	pnpm -C packages/custom-elements-manifest-to-types build
	pnpm run -r build
	pnpm tsc

.PHONY: test
test: install build
	pnpm run -r test
