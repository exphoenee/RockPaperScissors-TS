import { gameStatisticsType } from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { gameResultType } from "../../types/gameResultType";
import games from "../../constants/games";

class StatisticsHandler {
  private statistics: gameStatisticsType | [] = [];

  constructor(statistics?: gameStatisticsType) {
    if (statistics) this.statistics = statistics as gameStatisticsType;
  }

  fillStatistics(statistics: gameStatisticsType) {
    this.statistics = statistics;
  }

  getThrewsFromGame(gameName: string) {
    const game = games.find((game) => game.name === gameName);
    if (!game) return [];
    return game.rules.map((game) => game.value);
  }

  getTable(gameName = "Classic") {
    const gameStatistics = this.statistics.find(
      (game) => game.gameName === gameName
    );
    const threws = this.getThrewsFromGame(gameName);

    if (!gameStatistics || !threws) return [];

    const table = gameStatistics.statistics.reduce((acc, user) => {
      const userName = user.userName;

      const threwValues = threws.map((threwName) =>
        user.results
          .filter(
            (result) =>
              result.threwName.toUpperCase() === threwName.toUpperCase()
          )
          .reduce((sum, result) => {
            return sum + result.value;
          }, 0)
      );

      const total = threwValues.reduce((sum, value) => sum + value, 0);

      acc.push([userName, ...threwValues, total]);
      return acc;
    }, []);

    const headerTitles = threws.map((threw) => {
      return threw.charAt(0).toUpperCase() + threw.slice(1).toLowerCase();
    });
    const headers = ["User", ...headerTitles, "Total"];

    const total = table.reduce(
      (acc, row) =>
        row.slice(1).reduce((_, value, i) => {
          acc[i + 1] += value;
          return acc;
        }, acc),
      [...Array(headers.length)].map(() => 0)
    );

    total[0] = "Total";
    table.push(total);
    table.unshift(headers);

    console.log("getTable", table);
    return table;
  }

  getTableTransposed() {
    const result = this.getTable();
    const transposed = result[0].map((_, i) => result.map((row) => row[i]));
    console.log(transposed);
    return transposed;
  }

  getStatistics(): gameStatisticsType | [] {
    return this.statistics;
  }

  addValue({
    gameName,
    userName,
    threwName,
  }: {
    gameName: string;
    userName: string;
    threwName: string;
  }) {
    const timeDate = new Date().toISOString();

    const game = this.statistics?.find((game) => game.gameName === gameName);
    if (!game) {
      const newGameRecord = {
        gameName: gameName as gameNames,
        statistics: [
          {
            userName: userName as userNames,
            results: [{ threwName, value: 1, timeDate }],
          },
        ],
      };
      this.statistics.push(newGameRecord);
    }
    const user = game?.statistics.find((user) => user.userName === userName);
    if (!user) {
      const newUserRecord = {
        userName: userName as userNames,
        results: [{ threwName, value: 1, timeDate }],
      };
      game?.statistics?.push(newUserRecord);
    }
    const threw = user?.results.find(
      (result) => result.threwName === threwName
    );
    threw
      ? threw.value++
      : user?.results.push({ threwName, value: 1, timeDate });
    return true;
  }
}

export default StatisticsHandler;
