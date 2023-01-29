import StatisticsHandler from "../StatisticsHandler";
import { gameStatisticsType } from "../../../types/gameStatisticsType";
import { gameNames } from "../../../constants/gameNames";
import { userNames } from "../../../constants/userNames";

describe("StatisticsHandler", () => {
  it("should return the correct statistics", () => {
    const statisticsHandler = new StatisticsHandler();
  }).toBe("true");
});
