import React, { Component } from 'react';

class AddToCartButton extends Component {
  render() {
    return (
      <button onClick={() => this.props.addToCart()}>Lägg i kundkorg</button>
    )
  }
}
export default AddToCartButton;
