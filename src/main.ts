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


const added2 = statisticsHandler.addValue({
  userName: "test",
  gameName: "Cricket",
  threwName: "Scissors",
});

console.log(added2);
console.log(statisticsHandler.getStatistics());

const added3 = statisticsHandler.addValue({
  userName: "Lolla",
  gameName: "Tucsok",
  threwName: "Majom",
});

console.log(added3);
console.log(statisticsHandler.getStatistics());