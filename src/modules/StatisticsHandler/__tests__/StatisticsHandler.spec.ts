import { describe, it, expect, beforeEach } from "vitest";

import StatisticsHandler from "../StatisticsHandler";

describe("StatisticsHandler", () => {
  let statisticsHandler: StatisticsHandler;

  beforeEach(() => {
    statisticsHandler = new StatisticsHandler();
  });

  it("should be adding user: John, an normal RPS game a win with Rock", () => {
    statisticsHandler.addValue({
      userName: "John",
      gameName: "Rock Paper Scissors",
      threwName: "Rock",
    });

    const statistics = statisticsHandler.getStatistics();
    const table = statisticsHandler.getTable();

    expect(statistics).toEqual([
      {
        userName: "John",
        statistics: [
          {
            gameName: "Rock Paper Scissors",
            results: [
              {
                threwName: "Rock",
                value: 1,
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

    expect(statistics).toEqual([
      {
        userName: "John",
        statistics: [
          {
            gameName: "Rock Paper Scissors",
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
      userName: "John",
      gameName: "Rock Paper Scissors",
      threwName: "Rock",
    });

    statisticsHandler.addValue({
      userName: "John",
      gameName: "Rock Paper Scissors",
      threwName: "Rock",
    });

    statisticsHandler.addValue({
      userName: "Eric",
      gameName: "Rock Paper Scissors",
      threwName: "Paper",
    });

    const statistics = statisticsHandler.getStatistics();

    expect(statistics).toEqual([
      {
        userName: "John",
        statistics: [
          {
            gameName: "Rock Paper Scissors",
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
      {
        userName: "Eric",
        statistics: [
          {
            gameName: "Rock Paper Scissors",
            results: [
              {
                threwName: "Paper",
                value: 1,
                timeDate: expect.any(String),
              },
            ],
          },
        ],
      },
    ]);
  });
});
