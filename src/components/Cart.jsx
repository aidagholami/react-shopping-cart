import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { removeFromCart, clearShoppingCart } from '../actions/cartActions';
import { createOrder, clearOrder, closeSummery, showOrder } from '../actions/orderActions';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import PayPal from './PayPal';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createSummery = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
    }
    this.props.showOrder(order);
  }

  createOrder = (payment) => {
    if (payment && payment.paid) {
      const order = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        cartItems: this.props.cartItems,
        total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        // cancelled: payment.cancelled,
        paid: payment.paid,
        payerID: payment.payerID,
        paymentID: payment.paymentID,
        paymentToken: payment.paymentToken,
        returnUrl: payment.returnUrl
      }
      this.props.createOrder(order);
      this.props.clearShoppingCart();
      console.log("The payment was succeeded!", payment);
    }
  }

  closeModal = () => {
    this.props.closeSummery()
  }

  closeConfirmation = () => {
    this.props.clearOrder()
    this.setState({ showCheckout: false })
  }

  render() {
    const { cartItems, order } = this.props;

    return (
      <div>
        {
          (cartItems === null || cartItems.length === 0) ? <div className="cart cart-header">Cart is empty.</div>
          :
          <div className="cart cart-header">
            You have {cartItems.reduce((a, c) => a + c.count, 0)} items in the cart {' '}
          </div>
        }
        {
          order && 
          <Modal isOpen={true} onRequestClose={this.closeModal} ariaHideApp={false}>
            <Zoom>
               {order && order.paid ? (
                <div>
                  <button className="close-modal" onClick={this.closeConfirmation}>x</button>
                  <div className="order-details">
                    <h3 className="success-message">Your order has been placed.</h3>
                    <ul>
                      <li>
                        <div>payer ID</div>
                        <div>{order.payerID}</div>
                      </li>
                      <li>
                        <div>payment ID</div>
                        <div>{order.paymentID}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              ) :    
              (
              <div>
                <button className="close-modal" onClick={this.closeModal}>x</button>
                <div className="order-details">
                  <h3 className="summery-message">Summery of your Order</h3>
                  <ul>
                    <li>
                      <div>Name:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Address:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Cart Items:</div>
                      <div>{order.cartItems.map(x => (
                        <div key={x._id}>{x.count} {' x '} {x.title}</div>
                      ))}</div>
                    </li>
                    <li>
                        <PayPal onSuccess={this.createOrder} total={order.total}/>
                    </li>
                  </ul>
                </div>
              </div>
              )}
            </Zoom>
          </Modal>
        }
        {
          // order !== null &&
          cartItems !== null &&
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count} {' '}
                        <button className="button secondary" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: {' '}
                    {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                  </div>
                  <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Proceed</button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createSummery}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor='email'>Email</label>
                          <input type='email' name='email' id='email' required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <label htmlFor='name'>Name</label>
                          <input type='text' name='name' id='name' required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <label htmlFor='address'>Address</label>
                          <input type='text' name='address' id='address' required onChange={this.handleInput}></input>
                        </li>
                        <li>
                          <button className='button primary' type="submit">Checkout</button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
        }
      </div>
    )
  }
}

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  order: state.order.order
}),
{ 
  removeFromCart,
  clearShoppingCart,
  createOrder,
  clearOrder,
  closeSummery,
  showOrder
}
)(Cart);