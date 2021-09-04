import { ElementObject } from "./ielement-object";

export const createElement = function (elementObject: ElementObject) {
  let type = elementObject.type || "div";
  let element = document.createElement(type);

  // assign properties
  for (const key of Object.keys(elementObject)) {
    if (key != "type" && key != "style" && key != "attributes") {
      element[key] = elementObject[key];
    }
  }

  // assign style
  if (elementObject.style) {
    for (let key of Object.keys(elementObject.style)) {
      let value = elementObject.style[key];

      // convert attribute key from camel case to dash syntax
      if (key != key.toLowerCase()) {
        key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      }

      element.style[key] = value;
    }
  }

  // assign attributes
  if (elementObject.attributes) {
    for (let key of Object.keys(elementObject.attributes)) {
      let value = elementObject.attributes[key];

      // convert attribute key from camel case to dash syntax
      if (key != key.toLowerCase()) {
        key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      }

      element.setAttribute(key, value);
    }
  }

  return element;
};
