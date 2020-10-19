// feature 1
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from './store';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
  }

  createOrder = (order) => {
    alert('need to save order for '+ order.name);
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice().filter(x => x._id !== product._id);
    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter store={store} ></Filter>
                <Products addToCart={this.addToCart}></Products>
              </div>
              <div className="sidebar">
                <Cart cartItems = {this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}></Cart>
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
          </footer>
        </div>
      </Provider>
    );
  }
}

export default App;
