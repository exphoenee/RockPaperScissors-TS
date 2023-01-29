import GameContorller from "./modules/GameContorller";
import StatisticsHandler from "./modules/StatisticsHandler/StatisticsHandler";

new GameContorller();

const statisticsHandler = new StatisticsHandler();

statisticsHandler.addValue({
  userName: "test",
  gameName: "Cricket",
  threwName: "Scissors",
});
statisticsHandler.addValue({
  userName: "test",
  gameName: "Cricket",
  threwName: "Scissors",
});
statisticsHandler.addValue({
  userName: "Lolla",
  gameName: "Tucsok",
  threwName: "Majom",
});
statisticsHandler.addValue({
  userName: "Lolla",
  gameName: "Tucsok",
  threwName: "Majom",
});
statisticsHandler.addValue({
  userName: "Lolla",
  gameName: "Tucsok",
  threwName: "Rokka",
});

console.log(statisticsHandler.getStatistics());

const valami = statisticsHandler.getStatistics().map((user) => user.userName);

console.log(valami);

statisticsHandler.getTable();
statisticsHandler.getTableTransposed();
