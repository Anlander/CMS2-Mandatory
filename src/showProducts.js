import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { addToCart } from './functions';


class ShowProducts extends Component {
    render() {
      let API = 'http://localhost:8080/';
        const product = this.props.product;

        return (
              <section className="product-card">
                <div className="product-header-info">
                  <div className="product-card-header">
                    <article>
                      <h3>{product.Name}</h3>
                    </article>
                      <p ><img src={`${API}`+ product.Image.path} alt="picture" className="picture" /> </p>
                  </div>
                  <div className="product-card-info">
                    <p>{product.Desc}</p>
                    <p>Antal i lager: {product.Stock}</p>
                    <p>Pris: {product.Price} :-</p>
                  </div>
                </div>
                <div className="product-card-button-link">
                  <div className="product-card-links">
                    <AddToCartButton addToCart={addToCart.bind(this, product)}/>
                    <NavLink to={`/Product/${product._id}`}><button className="product-more-info-button">Mer info</button></NavLink>
                  </div>
                </div>
              </section>
        )
    }
}
export default ShowProducts;
