const getState = (state: string): any => {
  const value = localStorage.getItem(state);
  if (value) {
    return value; //JSON.stringify(value);
  } else {
    console.error(`No state: ${state} found!`);
    // throw new Error("No state found");
    return false;
  }
};
export default getState;
