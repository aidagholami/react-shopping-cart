// feature 1
import React, { Component } from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: ''
    }
  }
  filterProducts = (event) => {
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: data.products
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(p => p.availableSizes.indexOf(event.target.value) >= 0)
      });
    }
  }
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState(state => ({
      sort: sort,
      products: state.products.slice().sort((a, b) => (
        sort === 'lowest' ? ((a.price > b.price)? 1 : -1):
        sort === 'highest' ? ((a.price < b.price)? 1 : -1):
        ((a._id < b._id)? 1 : -1)
      ))
    }));
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
              filterProducts={this.filterProducts} 
              sortProducts={this.sortProducts}></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">
              Cart Items
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
