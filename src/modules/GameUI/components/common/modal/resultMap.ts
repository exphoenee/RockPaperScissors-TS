export type resultMapType = {
  winner: string;
  winnerChoice: string;
  looserChoice: string;
};

const resultMap = ({ winner, winnerChoice, looserChoice }: resultMapType) => {
  return {
    tag: "p",
    attrs: {
      class: "result-test",
    },
    text: `${winner} won with ${winnerChoice} against ${looserChoice}`,
  };
};

export default resultMap;
