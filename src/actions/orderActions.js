import { 
  CLEAR_ORDER,
  CREATE_ORDER
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
  });
};

export const clearOrder = () => (dispatch) => {
  localStorage.clear('cartItems');
  dispatch({ type: CLEAR_ORDER })
}