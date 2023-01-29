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

  getTable() {
    const data = this.statistics;
    const header = [
      "userName",
      ...new Set(
        data.flatMap((x) =>
          x.statistics.flatMap((y) => y.results.map((z) => z.threwName))
        )
      ),
    ];
    const rows = data.map((x) => [
      x.userName,
      ...header
        .slice(1)
        .map(
          (y) =>
            x.statistics
              .flatMap((z) => z.results)
              .find((w) => w.threwName === y)?.value || 0
        ),
      x.statistics
        .flatMap((y) => y.results.map((z) => z.value))
        .reduce((a, b) => a + b, 0),
    ]);
    const footer = [
      "Total",
      ...header
        .slice(1)
        .map((x) => rows.reduce((a, b) => a + (b[header.indexOf(x)] || 0), 0)),
      rows.reduce((a, b) => a + b[header.length - 2], 0),
    ];

    const result = [header, ...rows, footer];
    console.log(result);
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
      const newUserRecord = {
        userName: userName as userNames,
        statistics: [
          {
            gameName: gameName as gameNames,
            results: [{ threwName, value: 1, timeDate }],
          },
        ],
      };
      this.statistics.push(newUserRecord);
    }
    const game = user?.statistics.find((game) => game.gameName === gameName);
    if (!game) {
      const newGameRecord = {
        gameName: gameName as gameNames,
        results: [{ threwName, value: 1, timeDate }],
      };
      user?.statistics?.push(newGameRecord);
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
