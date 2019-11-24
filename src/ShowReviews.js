import React, { Component } from 'react';
import ReviewForm from './ReviewForm';


class ShowReviews extends Component {
  constructor() {
    super();
    this.state = {
      reviews: []
      }
    }
    getReviews() {
      fetch("http://localhost:8080/review")
      .then(res => res.json())
      .then(review => {
        this.setState({
          reviews: review.reverse()
        })
      })
    }
    componentDidMount() {
      this.getReviews();
    }
  render() {
    const review = this.state.reviews.map(rev => {
      if(rev.ProductId.match(this.props.id)) {
        return (
          <div key={rev.id} className="show-review-div">
              <p><strong>Skrivet av:</strong> {rev.Author}</p>
              <p><strong>Kommentar:</strong> {rev.Review}</p>
              <p><strong>Betyg:</strong> {rev.Rating}</p>
          </div>
        )
      }
    })
    return (
      <div>
        <div>
          <ReviewForm id={this.props.id} updateReview={this.getReviews.bind(this)}/>
        </div>
        <h3 className="review-header">Recensioner</h3>
        <p className="show-review">{review}</p>
      </div>
    )
  }
}
export default ShowReviews;
