import GameContorller from "./modules/GameContorller";
import StatisticsHandler from "./modules/StatisticsHandler/StatisticsHandler";

new GameContorller();

const statisticsHandler = new StatisticsHandler();

statisticsHandler.addValue({
  userName: "User1",
  gameName: "Classic",
  threwName: "Scissors",
});
statisticsHandler.addValue({
  userName: "User1",
  gameName: "Classic",
  threwName: "Scissors",
});
statisticsHandler.addValue({
  userName: "User2",
  gameName: "Classic",
  threwName: "Paper",
});

console.log("STATISTICS: ", statisticsHandler.getStatistics());

statisticsHandler.getTable();
statisticsHandler.getTableTransposed();
