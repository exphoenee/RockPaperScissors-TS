import headerMap from "./header/headerMap";
import gameAreaMap from "./gameArea/gameAreaMap";
import modalsMap from "./modals/modalsMap";
import ruleType from "../../../../types/ruleType";

const appMap = ({ rules }: { rules: ruleType[] }) => {
  return {
    tag: "div",
    attrs: {
      id: "rps-ui",
    },
    children: [headerMap, gameAreaMap({ rules }), ...modalsMap],
  };
};

export default appMap;
