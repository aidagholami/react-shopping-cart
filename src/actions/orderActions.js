import { 
  CLEAR_ORDER,
  CREATE_ORDER,
  CLOSE_SUMMERY,
  SHOW_ORDER
} from '../types';

export const createOrder = (order) => (dispatch) => {
  fetch('https://portfolio-shopping-cart.herokuapp.com/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  }).then(res => res.json())
  .then(data => {
    dispatch({ type: CREATE_ORDER, payload: data });
  })
  .catch(error => console.log('aida', error));
};

export const clearOrder = () => (dispatch) => {
  localStorage.clear('cartItems');
  dispatch({ type: CLEAR_ORDER })
}

export const closeSummery = () => (dispatch) => {
  dispatch({ type: CLOSE_SUMMERY })
}

export const showOrder = (order) => (dispatch) => {
  dispatch({ type: SHOW_ORDER, payload: order })
}