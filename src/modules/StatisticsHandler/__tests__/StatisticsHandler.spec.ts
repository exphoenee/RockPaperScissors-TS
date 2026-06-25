import { describe, it, expect, beforeEach } from "vitest";

import StatisticsHandler from "../StatisticsHandler";

describe("StatisticsHandler", () => {
  let statisticsHandler: StatisticsHandler;

  beforeEach(() => {
    statisticsHandler = new StatisticsHandler();
  });

  it("should be adding user: John, an normal RPS game a win with Rock", () => {
    statisticsHandler.addScore({
      gameName: "Classic",
      userName: "John",
      threwName: "Rock",
    });

    const statistics = statisticsHandler.getStatistics();
    const table = statisticsHandler.getTable("Classic");

    expect(statistics).toStrictEqual([
      {
        gameName: "Classic",
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

  it("accumulates multiple wins with the same throw", () => {
    statisticsHandler.addScore({ gameName: "Classic", userName: "John", threwName: "Rock" });
    statisticsHandler.addScore({ gameName: "Classic", userName: "John", threwName: "Rock" });
    statisticsHandler.addScore({ gameName: "Classic", userName: "John", threwName: "Paper" });

    expect(
      statisticsHandler.getScore({ gameName: "Classic", userName: "John" })
    ).toBe(3);
  });

  it("returns 0 score for an unknown user", () => {
    expect(
      statisticsHandler.getScore({ gameName: "Classic", userName: "Nobody" })
    ).toBe(0);
  });

  it("aggregates a table across multiple users", () => {
    statisticsHandler.addScore({ gameName: "Classic", userName: "John", threwName: "Rock" });
    statisticsHandler.addScore({ gameName: "Classic", userName: "Jane", threwName: "Scissors" });
    statisticsHandler.addScore({ gameName: "Classic", userName: "Jane", threwName: "Scissors" });

    expect(statisticsHandler.getTable("Classic")).toEqual([
      ["Player", "Rock", "Paper", "Scissors", "Total"],
      ["John", 1, 0, 0, 1],
      ["Jane", 0, 0, 2, 2],
      ["Total", 1, 0, 2, 3],
    ]);
  });

  it("returns an empty table for an unknown game", () => {
    expect(statisticsHandler.getTable("DoesNotExist")).toEqual([]);
  });

  it("uses the Classic game as default for getTable()", () => {
    statisticsHandler.addScore({ gameName: "Classic", userName: "John", threwName: "Rock" });
    expect(statisticsHandler.getTable()).toEqual(
      statisticsHandler.getTable("Classic")
    );
  });
});
