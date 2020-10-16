// feature 1
import React, { Component } from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      currentAction: {
        size: '',
        sort: ''
      },
      cartItems: []
    }
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(x => x._id !== product._id)})
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
  }

  filter = (event) => {
    const action = event.target.id;

    if (action === 'size') {
      const size = event.target.value;
      this.setState(prevState => (
        {
          currentAction: {
            size: size,
            sort: prevState.currentAction.sort,
          },
          products: data.products.slice().filter(p => p.availableSizes.indexOf(size) >= 0).sort((a, b) => (
            prevState.currentAction.sort === 'lowest' ? ((a.price > b.price)? 1 : -1):
            prevState.currentAction.sort === 'highest' ? ((a.price < b.price)? 1 : -1):
            ((a._id < b._id)? 1 : -1)
          ))
        }
      ))
    } else if (action === 'sort') {
      const sort = event.target.value;
      this.setState(prevState => (
        {
          currentAction: {
            size: prevState.currentAction.size,
            sort: sort
          },
          products: data.products.slice().filter(p => p.availableSizes.indexOf(prevState.currentAction.size) >= 0).sort((a, b) => (
            sort === 'lowest' ? ((a.price > b.price)? 1 : -1):
            sort === 'highest' ? ((a.price < b.price)? 1 : -1):
            ((a._id < b._id)? 1 : -1)
          ))
        }
      ))
    }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
              count={this.state.products.length} 
              size={this.state.size} 
              sort={this.state.sort} 
              filterProducts={this.filter} 
              sortProducts={this.filter}></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems = {this.state.cartItems} removeFromCart={this.removeFromCart}></Cart>
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}

export default App;
