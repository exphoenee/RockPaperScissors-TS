import headerMap from "./header/headerMap";
import gameAreaMap from "./gameArea/gameAreaMap";
import modalsMap from "./modals/modalsMap";

export type appMapType = {
  user: string;
  opponent: string;
};

const appMap = ({ user, opponent }: appMapType) => {
  return {
    tag: "div",
    attrs: {
      id: "app",
    },
    children: [
      headerMap,
      gameAreaMap({ user, opponent }),
      ...modalsMap.map((modal) => modal.element),
    ],
  };
};

export default appMap;
