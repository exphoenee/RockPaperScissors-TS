import { describe, it, expect, beforeEach } from "vitest";

import StatisticsHandler from "../StatisticsHandler";

describe("StatisticsHandler", () => {
  let statisticsHandler: StatisticsHandler;

  beforeEach(() => {
    statisticsHandler = new StatisticsHandler();
  });

  it("should be adding user: John, an normal RPS game a win with Rock", () => {
    statisticsHandler.addScore({
      gameName: "Rock Paper Scissors",
      userName: "John",
      threwName: "Rock",
    });

    const statistics = statisticsHandler.getStatistics();
    const table = statisticsHandler.getTable();

    expect(statistics).toStrictEqual([
      {
        gameName: "Rock Paper Scissors",
        statistics: [
          {
            userName: "John",
            results: [
              {
                threwName: "Rock",
                wins: [expect.any(String)],
              },
            ],
          },
        ],
      },
    ]);

    expect(table).toEqual([
      ["Player", "Rock", "Paper", "Scissors", "Total"],
      ["John", 1, 0, 0, 1],
      ["Total", 1, 0, 0, 1],
    ]);
  });
});
