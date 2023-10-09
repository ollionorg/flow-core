SHELL:=/bin/bash

ifeq ($(shell which node),)
$(error NodeJS is not installed. Please make sure you have NodeJS > 18.12 installed.)
endif

ifeq ($(shell which pnpm),)
$(error pnpm is not installed. Please make sure you install it by corepack enable && corepack prepare pnpm@8.9.0 --activate.)
endif

.PHONY: install
install:
	pnpm install

.PHONY: build-lib
build-lib: install
	cp README.md packages/flow-core
	pnpm -C packages/custom-elements-manifest-to-types build
	pnpm run -r build
	pnpm tsc -b
	node generate-types.cjs

.PHONY: build-storybook
build-storybook: install
	pnpm build-storybook

.PHONY: build
build: build-lib build-storybook

.PHONY: test
test: build
	pnpm run -r test

.PHONY: publish
publish: build-lib
	pnpm -r publish --dry-run --no-git-checks
