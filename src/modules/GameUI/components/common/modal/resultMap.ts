export type resultMapType = {
  winner: string;
  winsWith: string;
  against: string;
};

const resultMap = ({ winner, winsWith, against }: resultMapType) => {
  return `<p>${
    winner !== ""
      ? `The winner is ${winner} with ${winsWith} against ${against}`
      : "It's a draw!"
  }</p>`;
};

export default resultMap;
