import StatisticsHandler from "../StatisticsHandler";

describe("StatisticsHandler", () => {
  let statisticsHandler: StatisticsHandler;

  beforeEach(() => {
    statisticsHandler = new StatisticsHandler();
  });

  test("addValue adds a value to statistics", () => {
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
