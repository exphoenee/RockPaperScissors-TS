import { gameStatisticsType } from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { gameResultType } from "../../types/gameResultType";

class StatisticsHandler {
  private statistics: gameStatisticsType | [] = [];

  constructor() {
    console.log("StatisticsHandler constructor");
  }

  addStatistics(statistics: gameStatisticsType) {
    this.statistics = statistics;
  }

  getStatistics(): gameStatisticsType | [] {
    return this.statistics;
  }

  addValue({
    userName,
    gameName,
    threwName,
  }: {
    userName: string;
    gameName: string;
    threwName: string;
  }) {
    const timeDate = new Date().toISOString();

    const user = this.statistics?.find((user) => user.userName === userName);
    if (!user) {
      this.statistics = [
        {
          ...this.statistics,
          userName: userName as userNames,
          statistics: [
            {
              gameName: gameName as gameNames,
              results: [{ threwName, value: 1, timeDate }],
            },
          ],
        },
      ];
    }
    const game = user?.statistics.find((game) => game.gameName === gameName);
    if (!game) {
      this.statistics = [
        {
          ...this.statistics,
          userName: userName as userNames,
          statistics: [
            {
              gameName: gameName as gameNames,
              results: [{ threwName, value: 1, timeDate }],
            },
          ],
        },
      ];
    }
    const threw = game?.results.find(
      (result) => result.threwName === threwName
    );
    threw
      ? threw.value++
      : game?.results.push({ threwName, value: 1, timeDate });
    return true;
  }
}

export default StatisticsHandler;
