import { gameStatisticsType } from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { gameResultType } from "../../types/gameResultType";

class statisticsHandler {
  private statistics: gameStatisticsType;

  constructor({ statistics }: { statistics: gameStatisticsType }) {
    this.statistics = statistics;
  }

  addStatistics(statistics: gameStatisticsType) {
    this.statistics = statistics;
  }

  getStatistics(): gameStatisticsType {
    return this.statistics;
  }

  addValue(gameName: string, userName: string, threwName: string) {
    const user = this.statistics.find((user) => user.userName === userName);
    if (!user) return false;
    const game = user.statistics.find((game) => game.gameName === gameName);
    if (!game) return false;
    const threw = game.results.find((result) => result.threwName === threwName);
    threw
      ? threw.value++
      : (game?.results = [...game.results, { threwName, value: 1 }]);
    return true;
  }
}

export default statisticsHandler;
