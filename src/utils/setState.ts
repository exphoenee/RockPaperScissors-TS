const setState = (stateKey: any, newState: any): void => {
  if (!stateKey) {
    throw new Error("No state provided");
  }
  if (!newState) {
    throw new Error("No new state provided");
  }
  if (typeof newState !== "string") {
    newState = JSON.stringify(newState);
  }
  localStorage.setItem(stateKey, newState);
};

export default setState;
