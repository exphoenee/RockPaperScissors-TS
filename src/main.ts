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
  userName: "User2",
  gameName: "Classic",
  threwName: "Scissors",
});
statisticsHandler.addValue({
  userName: "User2",
  gameName: "Classic",
  threwName: "Rock",
});
statisticsHandler.addValue({
  userName: "User3",
  gameName: "Classic",
  threwName: "Paper",
});
statisticsHandler.addValue({
  userName: "User3",
  gameName: "Big Band Theory",
  threwName: "Paper",
});

console.log(statisticsHandler.getStatistics());

const valami = statisticsHandler.getStatistics().map((game) => game.gameName);

console.log(valami);

statisticsHandler.getTable();
statisticsHandler.getTableTransposed();
