const { CREATE_ORDER, CLEAR_ORDER, CLOSE_SUMMERY, SHOW_ORDER } = require("../types");

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.payload };
    case CLEAR_ORDER: 
      return { order: null };
    case SHOW_ORDER: 
      return { order: action.payload };
    case CLOSE_SUMMERY: 
      return { order: action.payload };
    default:
      return state;
  }
};

export { orderReducer };