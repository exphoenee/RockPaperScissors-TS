import { describe, it, expect, beforeEach } from "vitest";

import StatisticsHandler from "../StatisticsHandler";

describe("StatisticsHandler", () => {
  let statisticsHandler: StatisticsHandler;

  beforeEach(() => {
    statisticsHandler = new StatisticsHandler();
  });

  it("should be adding user: John, an normal RPS game a win with Rock", () => {
    statisticsHandler.addValue({
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
                timeDate: expect.any(String),
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

  it("should be adding user: John, an normal RPS game a win with Rock 2 times", () => {
    statisticsHandler.addValue({
      userName: "John",
      gameName: "Rock Paper Scissors",
      threwName: "Rock",
    });

    statisticsHandler.addValue({
      userName: "John",
      gameName: "Rock Paper Scissors",
      threwName: "Rock",
    });

    const statistics = statisticsHandler.getStatistics();

    expect(statistics).toStrictEqual([
      {
        gameName: "Rock Paper Scissors",
        statistics: [
          {
            userName: "John",
            results: [
              {
                threwName: "Rock",
                value: 2,
                timeDate: expect.any(String),
              },
            ],
          },
        ],
      },
    ]);
  });

  it("should be adding user: John, an normal RPS game a win with Rock 2 times and Eric a paper win once", () => {
    statisticsHandler.addValue({
      gameName: "Rock Paper Scissors",
      userName: "John",
      threwName: "Rock",
    });

    statisticsHandler.addValue({
      gameName: "Rock Paper Scissors",
      userName: "John",
      threwName: "Rock",
    });

    statisticsHandler.addValue({
      gameName: "Rock Paper Scissors",
      userName: "Eric",
      threwName: "Paper",
    });

    const statistics = statisticsHandler.getStatistics();

    expect(statistics).toStrictEqual([
      {
        gameName: "Rock Paper Scissors",
        statistics: [
          {
            userName: "John",
            results: [
              {
                threwName: "Rock",
                wins: expect.any(Array),
              },
            ],
          },
        ],
      },
      {
        gameName: "Rock Paper Scissors",
        statistics: [
          {
            userName: "Eric",
            results: [
              {
                threwName: "Paper",
                wins: expect.any(Array),
              },
            ],
          },
        ],
      },
    ]);
  });
});
