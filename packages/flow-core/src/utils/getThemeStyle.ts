/**
 * Gets styles by a selector
 *
 * @notice The selector must be 1:1 the same as in the CSS
 * @param string selector
 */
function getStyleWithSelector(selector: string) {
  const styleSheets = window.document.styleSheets;
  const styleSheetsLength = styleSheets.length;
  for (let i = 0; i < styleSheetsLength; i++) {
    const classes = styleSheets[i].rules || styleSheets[i].cssRules;
    if (classes) {
      const classesLength = classes.length;
      for (let x = 0; x < classesLength; x++) {
        const styleRule = classes[x] as CSSStyleRule;
        if (styleRule.selectorText == selector) {
          let ret;
          if (classes[x].cssText) {
            ret = classes[x].cssText;
          } else {
            ret = styleRule.style.cssText;
          }
          if (ret.indexOf(styleRule.selectorText) == -1) {
            ret = styleRule.selectorText + "{" + ret + "}";
          }
          return ret;
        }
      }
    }
  }
  return;
}

export default function getThemeStyle(selector: string) {
  const styleWithSelector = getStyleWithSelector(selector);
  if (styleWithSelector) {
    const found = []; // an array to collect the strings that are found
    const rxp = /{([^}]+)}/g;
    let curMatch;

    while ((curMatch = rxp.exec(styleWithSelector))) {
      found.push(curMatch[1]);
    }

    return ":root{" + found.join(";") + "}";
  }
  return;
}
