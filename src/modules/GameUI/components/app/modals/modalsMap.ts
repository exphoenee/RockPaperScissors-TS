import domelemjs from "domelemjs";

import modalMap from "../../common/modal/modalMap";
import modals from "./modalContents/modals";

const modalsMap = modals.map((modal) => {
  return { name: modal.name, element: domelemjs(modalMap(modal)) };
});

export default modalsMap;
