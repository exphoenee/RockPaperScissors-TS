import moduleName from "module";
import { gameResults } from "../../../../../constants/gameResults";

export type resultMapType = {
  result: gameResults;
  user: string;
  opponent: string;
  userChoice: string;
  opponentChoice: string;
};

const resultMap = ({
  result,
  user,
  opponent,
  userChoice,
  opponentChoice,
}: resultMapType) => {
  const resultText = {
    [gameResults.USER]: `${user} won with ${userChoice} against ${opponentChoice}`,
    [gameResults.OPPONENT]: `${opponent} won with ${opponentChoice} against ${userChoice}`,
    [gameResults.DRAW]: `It's a draw!`,
  };

  return `<p>${resultText[result]}</p>`;
};

export default resultMap;
