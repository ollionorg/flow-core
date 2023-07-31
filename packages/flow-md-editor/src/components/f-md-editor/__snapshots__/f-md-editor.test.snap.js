/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["f-md-editor should match view mode snapshot"] = 
`<div class="markdown-body">
  <h1 id="heading-1">
    Heading 1
  </h1>
  <h2 id="heading-2">
    Heading 2
  </h2>
  <h3 id="heading-3">
    Heading 3
  </h3>
  <h4 id="heading-4">
    Heading 4
  </h4>
  <h5 id="heading-5">
    Heading 5
  </h5>
  <h6 id="heading-6">
    Heading 6
  </h6>
  <p>
    Paragraph text. This is a sample Markdown file demonstrating various features.
  </p>
  <h2 id="emphasis">
    Emphasis
  </h2>
  <p>
    <em>
      Italic text
    </em>
    or
    <em>
      Italic text
    </em>
  </p>
  <p>
    <strong>
      Bold text
    </strong>
    or
    <strong>
      Bold text
    </strong>
  </p>
  <p>
    <strong>
      <em>
        Bold and italic text
      </em>
    </strong>
  </p>
  <h2 id="lists">
    Lists
  </h2>
  <p>
    Unordered list:
  </p>
  <ul>
    <li>
      Item 1
    </li>
    <li>
      Item 2
    </li>
    <li>
      Item 3
    </li>
  </ul>
  <p>
    Ordered list:
  </p>
  <ol>
    <li>
      First item
    </li>
    <li>
      Second item
    </li>
    <li>
      Third item
    </li>
  </ol>
  <h2 id="links">
    Links
  </h2>
  <p>
    <a href="https://openai.com">
      Link to OpenAI's website
    </a>
  </p>
  <h2 id="images">
    Images
  </h2>
  <p>
    <img
      alt="Markdown logo"
      src="https://markdown-here.com/img/icon256.png"
    >
  </p>
  <h2 id="code">
    Code
  </h2>
</div>
`;
/* end snapshot f-md-editor should match view mode snapshot */

snapshots["f-md-editor should match edit mode snapshot"] = 
`<div
  class="flow-editable"
  contenteditable="true"
>
  # Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Paragraph text. This is a sample Markdown file demonstrating various features.

## Emphasis

*Italic text* or _Italic text_

**Bold text** or __Bold text__

**_Bold and italic text_**

## Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item

## Links

[Link to OpenAI's website](https://openai.com)

## Images

![Markdown logo](https://markdown-here.com/img/icon256.png)

## Code
</div>
`;
/* end snapshot f-md-editor should match edit mode snapshot */

