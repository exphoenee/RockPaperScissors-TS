export type gameStatisticsType = {
  name: string;
  values: {
    opponent: {
      [key: string]: number;
    };
    player: {
      [key: string]: number;
    };
  };
};

type statisticsType = gameStatisticsType[];

export default statisticsType;
