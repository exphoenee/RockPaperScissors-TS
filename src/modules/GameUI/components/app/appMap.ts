import headerMap from "./components/headerMap";
import gameAreaMap from "./components/gameAreaMap";
import modalsMap from "./components/modalsMap";

const appMap = {
  tag: "div",
  attrs: {
    id: "app",
  },
  children: [headerMap, gameAreaMap, ...modalsMap],
};

export default appMap;
