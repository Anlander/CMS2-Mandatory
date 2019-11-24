import React, { Component } from 'react';

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      reviewObject: {
        ProductId: null,
        Author: '',
        Review: '',
        Rating: null
      }
    }
  }
  getInputValues(e) {
    e.preventDefault();
    this.setState({
      reviewObject: {
        ProductId: this.props.id,
        Author: this.refs.author.value,
        Review: this.refs.review.value,
        Rating: Number(this.refs.rating.value),
      }
    })
  }
  postReview(e) {
    e.preventDefault();
    fetch('http://localhost:8080/review', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.reviewObject)
    }).then(() => this.props.updateReview())

    this.setState({
      reviewObject: {
        ProductId: null,
        Author: '',
        Review: '',
        Rating: null
      }
    })
    this.refs.clearForm.reset();
  };
  render() {
    return (
      <div>
        <form className="product-review-form-div" onSubmit={this.postReview.bind(this)} ref="clearForm">
          <div className="review-name-div">
            <p>Ditt namn: </p>
            <input type="text" required ref="author" onChange={this.getInputValues.bind(this)}/>
          </div>
          <div className="review-text-div">
            <p>Recension: </p>
            <textarea rows="10" cols="50" required ref="review" onChange={this.getInputValues.bind(this)}/>
          </div>
          <div className="review-rating-div">
            <p>Betyg: </p>
            <div>
              <select required ref="rating" onChange={this.getInputValues.bind(this)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <button type="submit">Skicka</button>
          </div>
          </div>
        </form>
      </div>
    )
  }
}
export default ReviewForm;
