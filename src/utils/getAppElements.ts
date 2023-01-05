import appElements, { appElementType } from "../constants/appElements";

export default function getAppElements(): (Element | Element[] | null)[] {
  const domElems = appElements.reduce((acc: Object, el: appElementType) => {
    if (el.id) {
      acc[el.name] = document.getElementById(el.id);
    } else if (el.class) {
      acc[el.name] = document.querySelector(el.class);
    } else if (el.classes) {
      acc[el.name] = Array.from(document.querySelectorAll(el.classes));
    } else {
      console.error(el.name, "is missing!");
    }
    return acc;
  }, {});
  return domElems;
}
