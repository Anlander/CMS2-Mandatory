import React, { Component } from 'react';
import GetProducts from './getProducts';
import ShowProducts from './showProducts';
import Filter from './Filter';
import { getFilter } from './functions';
import { NavLink } from 'react-router-dom';
import Header from './Header';



class FrontPage extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    }
  }

  setUrl(filterArray) {
    const sortURL = getFilter(filterArray);
    this.getProducts(sortURL);
  }

  getProducts(sortUrl) {
    GetProducts(sortUrl)
    .then(product => {
      console.log(product);
      this.setState({
        products: product.entries,
      })
    })
  }

  componentDidMount() {
    this.getProducts()
  }
  checkedBox(filter) {
    this.setUrl(filter)
  }
  render() {
    const myProduct = this.state.products.map(product => {
      return <ShowProducts key={product.id} product={product} />
    })
    return (
      <div className="App">
        <div className="header-div">
          <Header />
        </div>
        <div>
          <NavLink to={"/checkout"}> Till Varukorgen</NavLink>
        </div>
        <div>
          <Filter checkBoxes={this.checkedBox.bind(this)}/>
        </div>
        <div className="product-s">
          {myProduct}
        </div>
      </div>
    );
  }
}
export default FrontPage;
