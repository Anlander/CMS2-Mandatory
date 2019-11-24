import React, {useState, useEffect} from 'react';
import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ShowReviews from './ShowReviews';
import AddToCartButton from './AddToCartButton';
import { addToCart } from "./functions";
import Header from './Header';

let API = 'http://localhost:8080/';

let API = 'http://localhost:8080/';

export default class Blogg extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      entries: [],
      title: "",
      des: "",
      date:"",


    }
  }


  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`${API}api/collections/get/Products?filter[_id]=${id}`)
      .then(res => {
        const data = res.data;
        console.log(data.entries);
        console.log(data);
        this.setState({
          data:res.data.entries
        })
        console.log(data.entries);
      })
  }



  render() {
    if (this.data === null){
      return <h1>There is no Data</h1>;
    }
    const loop = this.state.data.map(data => {
      return (
        <div>
          <Header />
          <div className="navlink-div single-product-nav-div">
            <NavLink to={"/"}>Start</NavLink>
            <NavLink to={"/checkout"}>Till Varukorgen</NavLink>
          </div>
          <h1> test</h1>
            <div className="single-product-specific">
              <div className="single-product-header">
                <h3>{product.Name}</h3>
                <img src={imgUrl} alt="Bild"/>
              </div>
              <div className="single-product-info">
                <p>{product.beskrivning}</p>
                <p>Antal i lager: {product.Stock} st</p>
              </div>
              <div className="single-product-button">
                <p>Pris: {product.Price} :-</p>
                <AddToCartButton addToCart={addToCart.bind(this, product)}/>
              </div>
            </div>
          <div>
            <ShowReviews id={this.props.match.params.id}/>
          </div>
        </div>
      )

    })

    return (
      <div className="maindiv">
        {loop}
      </div>
    )
  }
}
