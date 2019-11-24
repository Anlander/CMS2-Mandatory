import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { NavLink } from 'react-router-dom';
import ShowReviews from './ShowReviews';
import AddToCartButton from './AddToCartButton';
import { addToCart } from "./functions";
import Header from './Header';



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
            <NavLink to={"/"} className="start-nav">Start</NavLink>
            <NavLink to={"/checkout"} className="nav-menu">Till Varukorgen</NavLink>
          </div>

            <div>
              <div>
                <h3>{data.Name}</h3>
                <textfield>{data.Beskrivning}</textfield>
                <p ><img src={`${API}`+ data.Image.path} alt="picture" className="picture" /> </p>
              </div>
              <div>
                <p>Antal i lager: {data.Stock} st</p>
              </div>
              <div>
                <p>Pris: {data.Price} :-</p>
                <AddToCartButton addToCart={addToCart.bind(this, data)}/>
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
