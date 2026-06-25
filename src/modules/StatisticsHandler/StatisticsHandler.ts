import {
  gameStatisticsType,
  userStatisticsType,
} from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { statCalcModes } from "../../constants/statCalcModes";
import games from "../../constants/games";

class StatisticsHandler {
  private statistics: gameStatisticsType[] = [];

  constructor(statistics?: gameStatisticsType[]) {
    if (statistics) this.statistics = statistics;
  }

  public fillStatistics(statistics: gameStatisticsType[]) {
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

  private getGameStatistics(gameName: string) {
    return this.statistics.find(
      (game) => game?.gameName?.toUpperCase() === gameName?.toUpperCase()
    );
  }

  public getTable(
    gameName: string = gameNames.CLASSIC,
    _statisticMode: string = statCalcModes.VALUE
  ) {
    const gameStatistics: userStatisticsType[] | null =
      this.getGameStatistics(gameName)?.statistics || null;
    const threws = this.getThrewsFromGame(gameName);

    if (!gameStatistics || !threws) return [];

    const table: (string | number)[][] = gameStatistics.reduce(
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

  public getStatistics(): gameStatisticsType[] {
    return this.statistics;
  }

  public getScore({
    gameName,
    userName,
  }: {
    gameName: string;
    userName: string;
  }): number {
    const gameStatistics: userStatisticsType[] | null =
      this.getGameStatistics(gameName)?.statistics || null;

    const userResults = gameStatistics?.find(
      (user) => user.userName === userName
    )?.results;

    const score = userResults?.reduce((sum, result) => {
      return sum + result.wins.length;
    }, 0);

    return score || 0;
  }

  public addScore({
    gameName,
    userName,
    threwName,
    timeDate = false,
  }: {
    gameName: string;
    userName: string;
    threwName: string;
    timeDate?: string | false;
  }) {
    if (!timeDate) timeDate = new Date().toISOString();

    let gameRecord = this.statistics.find(
      (game) => game.gameName === gameName
    );
    if (!gameRecord) {
      gameRecord = {
        gameName: gameName as gameNames,
        statistics: [],
      };
      this.statistics.push(gameRecord);
    }

    let userRecord = gameRecord.statistics.find(
      (user) => user.userName === userName
    );
    if (!userRecord) {
      userRecord = {
        userName: userName as userNames,
        results: [],
      };
      gameRecord.statistics.push(userRecord);
    }

    const threwRecord = userRecord.results.find(
      (threw) => threw.threwName === threwName
    );

    !threwRecord
      ? userRecord.results.push({ threwName, wins: [timeDate] })
      : threwRecord.wins.push(timeDate);
    return this.getScore({ gameName, userName });
  }
}

export default StatisticsHandler;
