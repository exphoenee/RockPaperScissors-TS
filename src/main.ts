import GameContorller from "./modules/GameContorller";
import StatisticsHandler from "./modules/StatisticsHandler/StatisticsHandler";

new GameContorller();

const statisticsHandler = new StatisticsHandler();

const added = statisticsHandler.addValue({
  userName: "test",
  gameName: "Cricket",
  threwName: "Scissors",
});

console.log(added);

console.log(statisticsHandler.getStatistics());