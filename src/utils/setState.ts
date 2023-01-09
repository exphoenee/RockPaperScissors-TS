const setState = (state: any, newState: any): void => {
  localStorage.setItem(state, JSON.stringify(newState));
};

export default setState;
