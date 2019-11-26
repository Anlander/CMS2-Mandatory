import React, { Component } from 'react';
import GetProducts from './getProducts';
import ShowProducts from './showProducts';
import Filter from './Filter';
import { getFilter } from './functions';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
let API = 'http://localhost:8080/';


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

  componentDidUpdate(prevProps, prevState) {
      if (prevState.currentPage !== this.state.currentPage) {
        const skip = this.state.currentPage * this.state.perPage;
        axios.get(`${API}api/collections/get/Products?limit=${this.state.perPage}&skip=${skip}`)
          .then(res => {
            const data = res.data;
            console.log(prevProps);
            console.log(data);
            this.setState
              ({
              data:res.data.entries,
            })
          })
      }
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
          <button className="next" onClick={() => this.setState({ currentPage: Math.max(0, this.state.currentPage - 1) })}>Prev</button>
          <button className="next" onClick={() => this.setState({ currentPage: this.state.currentPage + 1 })}>Next</button>
          <p>Page {this.state.currentPage + 1}</p>
      </div>
    );
  }
}
export default FrontPage;
