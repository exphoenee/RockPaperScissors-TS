const getState = (state: string): any => {
  const value = localStorage.getItem(state);
  if (value) {
    return JSON.stringify(value);
  } else {
    throw new Error("No state found");
  }
};
export default getState;
