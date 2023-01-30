import { gameStatisticsType } from "../../types/gameStatisticsType";
import { userNames } from "../../constants/userNames";
import { gameNames } from "../../constants/gameNames";
import { gameResultType } from "../../types/gameResultType";

class StatisticsHandler {
  private statistics: gameStatisticsType | [] = [];

  constructor(statistics?: gameStatisticsType) {
    if (statistics) this.statistics = statistics as gameStatisticsType;
  }

  fillStatistics(statistics: gameStatisticsType) {
    this.statistics = statistics;
  }

  getTable(gameName = "Classic") {
    const classicGameData = this.statistics.filter(
      (game) => game.gameName === gameName
    )[0];

    const result = classicGameData.statistics.reduce((acc, user) => {
      const userName = user.userName;

      const rock = user.results
        .filter((result) => result.threwName === "Rock")
        .reduce((sum, result) => sum + result.value, 0);
      const paper = user.results
        .filter((result) => result.threwName === "Paper")
        .reduce((sum, result) => sum + result.value, 0);
      const scissors = user.results
        .filter((result) => result.threwName === "Scissors")
        .reduce((sum, result) => sum + result.value, 0);
      const total = rock + paper + scissors;

      acc.push([userName, rock, paper, scissors, total]);
      return acc;
    }, []);

    const headers = ["User", "Rock", "Paper", "Scissors", "Total"];
    result.unshift(headers);

    const total = result.reduce(
      (acc, row) => {
        for (let i = 1; i < row.length; i++) {
          acc[i] += row[i];
        }
        return acc;
      },
      [...Array(headers.length)].map(() => 0)
    );
    total[0] = "Total";
    result.push(total);

    console.log("getTable", result);
    return result;
  }

  getTableTransposed() {
    const result = this.getTable();
    const transposed = result[0].map((col, i) => result.map((row) => row[i]));
    console.log(transposed);
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
