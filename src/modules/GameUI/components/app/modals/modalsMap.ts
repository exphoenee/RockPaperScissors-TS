import modalMap from "../../common/modal/modalMap";
import modals from "./modalContents/modals";

const modalsMap = modals.map((modal) => modalMap(modal));

export default modalsMap;
