# Flow/flow-core

### Mission

# Flow aims to be the fastest way to go from prototype to implementation

Without comprimising on design quality and front-end developer experience.

Flow is a design system that consists of principles, patterns, guidelines, and processes to enable design at scale; without compromising on the developer experience and standards. It serves as a shared language between design and implementation.

## Benefits

- Framework agnostic - Flow will work with most modern JavaScript frameworks.
- Developer experience is a core value for Flow. Learn more here.
  - Flow Figma and Flow front-end framework speak the same language.
  - VScode intellisense plugin
  - Slack community
  - Create easy layouts with f-div
- Flow dependencies - you can pick and choose what packages are specifically required for your build.
- Flow bundles (coming soon)

# Values

Straight to it - this is an opinionated project. We share a handful of core beliefs and values around designing + building and we treat them as the basis for our decisions.

## Obvious

Flow as a design framework and front-end tooling needs to be simple, intuitive, and obvious to anyone using the framework. This includes naming conventions, props and values definitions, documentation, etc.

When it comes to property values, Flow works with a list of default property value names that are available for use. You can refer to (coming soon)

## Figma to FE

Everything for front-end implementation that is available in Flow is required to exist as a Figma document as well. The Figma component properties will be the same properties for the front-end developer. This allows for better design handover + developer experience.

If you are a developer thas a new contribution to Flow and do not have Figma experience/skills, you can write to flow@nonfx.com and someone from CloudCover’s design team will get in touch with you. Keep in mind that the designers are actively engaged in other products and a response/implementation might take a little time.

## Everything as dependencies

To keep everything lean and customizable, any new features should be created as dependencies to avoid bloat on the Flow core level. This allows for features to live on different streams and continuously develop/update without affecting the main core.
