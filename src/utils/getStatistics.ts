import appStates from "../constants/appStates";
import getState from "./getState";

const getStatistics = () => getState(appStates.STATISTICS);

export default getStatistics;
