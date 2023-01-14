import headerMap from "./header/headerMap";
import gameAreaMap from "./gameArea/gameAreaMap";
import modalsMap from "./modals/modalsMap";

const appMap = () => {
  return {
    tag: "div",
    attrs: {
      id: "app",
    },
    children: [headerMap, gameAreaMap(), ...modalsMap],
  };
};

export default appMap;
