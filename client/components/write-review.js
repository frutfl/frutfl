import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

function handleSubmit(productId, user, updateProductReview) {
  return function(evt) {
    evt.preventDefault();
    const review = {
      content: evt.target.content.value,
      productId: productId,
      rating: evt.target.rating.value,
      title: evt.target.title.value,
      userId: user.id
    };
    axios.post('/api/reviews', review)
    .then((res) => {
      const createdReview = res.data;
      createdReview.user = user;
      updateProductReview(createdReview);
    })
    .catch(console.error.bind(console));
  };
}

const WriteReview = (props) => {
  const product = props.product;
  const user = props.user;
  const updateProductReview = props.updateProductReview;
  return (
    <div>
      <h2>Write your review</h2>
      <form onSubmit={handleSubmit(product.id, user, updateProductReview)}>
        <div>
          <label htmlFor="title"><small>Title</small></label>
          <input name="title" type="text" />
        </div>
        <div>
          <label htmlFor="rating"><small>Rating</small></label>
          <select name="rating">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label htmlFor="content"><small>Review Body</small></label>
          <textarea name="content" />
        </div>
        <div>
          <button type="submit">Submit Review</button>
        </div>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapState, null)(WriteReview);
