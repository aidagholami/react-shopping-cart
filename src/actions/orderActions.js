import { 
  CLEAR_ORDER,
  CLEAR_SHOPPING_CART,
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
    localStorage.clear('cartItems');
    dispatch({ type: CLEAR_SHOPPING_CART })
  });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER })
}