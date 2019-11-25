import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUnique } from './functions';
import Header from './Header';
let API = 'http://localhost:8080/';

class CheckOut extends Component {
  constructor() {
    super();
    this.state = {
      cartProducts: [],
      personData: {
        Client: '',
        Address: '',
        Mail: '',

      }
    }
  }
  componentDidMount() {
    this.getLocal();
  }
  resetCart() {
    this.setState({
      cartProducts: []
    });
    localStorage.clear();
  }
  getLocal() {
      let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
      this.setState({
        cartProducts: productsInCart
      })
  }
  getPersonData(e) {
    e.preventDefault();
    this.setState({
      personData: {
        FullName: this.refs.client.value,
        Address: this.refs.address.value,
        Mail: this.refs.mail.value
      }
    })
  }
  sendOrder(e) {
    let totalPrice = 0;
    let productsToOrder = this.state.cartProducts.map(product => {
      totalPrice = Number(totalPrice + product.Price)
      return {
        ProductName: product.Name,
        ProductPrice: `${product.Price} SEK`,
        ProductId: product.id,
      }
    })
    console.log('productsOrder', productsToOrder);
    e.preventDefault();
    fetch('http://localhost:8080/order', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({PersonData: this.state.personData, OrderProducts: productsToOrder, TotalPrice: totalPrice})
  })
  this.refs.checkOutForm.reset();
  localStorage.clear();
  this.setState({
    cartProducts: []
  })
}
  render() {
    if(this.state.cartProducts.length > 0) {
      let cart = this.state.cartProducts
      .map(item => {
        return <div key={item.id} className="cart-products">
                  <div className="checkout-header-div">
                    <p className="check-out">{item.Name}</p>
                      <p ><img src={`${API}`+ item.Image.path} alt="picture" className="picture" /> </p>
                      <p> Price: {item.Price} :-</p>
                      <p> {item.amount}</p>
                  </div>
                  <div className="checkout-product-name-price-amount">

                  </div>
              </div>
      })


      let price = 0;

      this.state.cartProducts.map(item => {
        console.log(item);
        return price = Number(item.Price) + price;

      })
      return (
        <div>
          <Header />
          <div className="checkout-navlink">
            <NavLink to={"/"}>Start</NavLink>
          </div>
          <h2 className="ex-varu">Din Varukorg</h2>
          <div>
          </div>
          <p>{cart}</p>
          <p>Total Pris: {price} <strong>SEK</strong></p>
          <button className="reset-order-button" onClick={this.resetCart.bind(this)}>Töm Varukorg</button>
          <form className="order-form" onSubmit={this.sendOrder.bind(this)} ref="checkOutForm">
          <div>
            <p>Namn: </p>
            <input type="text" required onChange={this.getPersonData.bind(this)} ref="client" />
          </div>
            <div>
              <p>Adress: </p>
              <input type="text" required onChange={this.getPersonData.bind(this)} ref="address"/>
            </div>
            <div>
              <p>Mailadress: </p>
              <input type="mail" required onChange={this.getPersonData.bind(this)} ref="mail"/>
            </div>
            <div>
              <button type="submit">Check Out</button>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink to={"/"}>Start</NavLink>
          <h3>CheckOut</h3>
          <p>Cart Is empty but klick <NavLink to={"/"}>here</NavLink> to look at the products</p>
        </div>
      )
    }

  }
}
export default CheckOut;
