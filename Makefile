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
	# pnpm -C packages/flow-core-config run build
	# pnpm -C packages/flow-core run build
	pnpm concurrently --kill-others \
		"pnpm -C packages/flow-form-builder run build" \
		"pnpm -C packages/flow-lineage run build" \
		"pnpm -C packages/flow-code-editor run build" \
		"pnpm -C packages/flow-log run build" \
		"pnpm -C packages/flow-md-editor run build" \
		"pnpm -C packages/flow-table run build"

