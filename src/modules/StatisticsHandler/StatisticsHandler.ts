import {
  gameStatisticsType,
  threwStatisticsType,
  userStatisticsType,
} from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { gameResultType } from "../../types/gameResultType";
import games from "../../constants/games";

class StatisticsHandler {
  private statistics: gameStatisticsType | [] = [];

  constructor(statistics?: gameStatisticsType) {
    if (statistics) this.statistics = statistics as gameStatisticsType;
  }

  public fillStatistics(statistics: gameStatisticsType) {
    /* itt ne csak így bebeszkodva legyen */
    this.statistics = statistics;
  }

  public getForStorage() {
    return JSON.stringify(this.statistics);
  }

  private getThrewsFromGame(gameName: string) {
    const game = games.find((game) => game.name === gameName);
    if (!game) return [];
    return game.rules.map((game) => game.value);
  }

  public getTable(gameName = "Classic") {
    const gameStatistics = this.statistics.find(
      (game) => game.gameName === gameName
    );
    const threws = this.getThrewsFromGame(gameName);

    if (!gameStatistics || !threws) return [];

    const table: (string | number)[][] = gameStatistics.statistics.reduce(
      (acc: (string | number)[][], user) => {
        const threwValues = threws.map((threwName) =>
          user.results
            .filter(
              (result) =>
                result.threwName.toUpperCase() === threwName.toUpperCase()
            )
            .reduce((sum, result) => {
              return sum + result.wins.length;
            }, 0)
        );

        const total: number = threwValues.reduce(
          (sum, value) => sum + value,
          0
        );

        acc.push([user.userName, ...threwValues, total]);
        return acc;
      },
      []
    );

    const headerTitles = threws.map((threw) => {
      return threw.charAt(0).toUpperCase() + threw.slice(1).toLowerCase();
    });
    const headers = ["Player", ...headerTitles, "Total"];

    const total: (string | number)[] = table.reduce(
      (acc: number[], row) =>
        row.slice(1).reduce((_, value, i) => {
          acc[i + 1] += +value;
          return acc;
        }, acc),
      [...Array(headers.length)].map(() => 0)
    );

    total[0] = "Total";
    table.push(total);
    table.unshift(headers);
    return table;
  }

  public getTableTransposed() {
    const result = this.getTable();
    const transposed = result[0].map((_, i) => result.map((row) => row[i]));
    return transposed;
  }

  public getStatistics(): gameStatisticsType | [] {
    return this.statistics;
  }

  public addValue({
    gameName,
    userName,
    threwName,
  }: {
    gameName: string;
    userName: string;
    threwName: string;
  }) {
    const timeDate = new Date().toISOString();

    console.log("addValue", gameName, userName, threwName);

    const sGame = this.statistics?.find((game) => game.gameName === gameName);
    if (!sGame) {
      console.log("new game");
      const newGameRecord: gameStatisticsType = {
        gameName: gameName as gameNames,
        statistics: [
          {
            userName: userName as userNames,
            results: [{ threwName, wins: [timeDate] }] as threwStatisticsType,
          },
        ],
      };
      this.statistics.push(newGameRecord);
    }
    const sUser = sGame?.statistics?.find((user) => user.userName === userName);
    if (!sUser) {
      const newUserRecord: userStatisticsType = {
        userName: userName as userNames,
        results: [{ threwName, wins: [timeDate] }] as threwStatisticsType,
      };
      sGame?.statistics?.push(newUserRecord);
    }

    const sThrew = sUser?.results.find(
      (threw) => threw.threwName === threwName
    );
    console.log(sThrew);
    (!sThrew)
      ? sUser?.results.push({ threwName, wins: [timeDate] })
      : sThrew.wins.push(timeDate);
    return true;
  }
}

export default StatisticsHandler;
