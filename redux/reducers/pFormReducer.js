const pFormReducer = (
  state = {
    title: null,
    id: null,
    what: null,
    why: null,
    whyOptions: null,
    who: null,
    productType: null,
    pq1: null,
    pq2: null,
    pq3: null,
  },
  action
) => {
  switch (action.type) {
    case "pForm_UPDATE":
      return action.payload;

    default:
      return state;
  }
};

export default pFormReducer;
