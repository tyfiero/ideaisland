const pFormReducer = (
  state = {
    title: null,
    id: null,
    what: null,
    why: null,
    whyOptions: [],
    who: null,
    productType: null,
    pq1: null,
    pq2: null,
    pq3: null,
  },
  action
) => {
  switch (action.type) {
    case "pFORM_UPDATE":
      return action.payload;
 

    default:
      return state;
  }
};

export default pFormReducer;
