import React from 'react';

function renderStars(rating) {
  const starJsx = [];
  for (var i = 0; i < rating; i++) {
    starJsx.push(<span key={i}><img src="../images/star.png" /></span>);
  }
  for ( ; i < 5; i++) {
    starJsx.push(<span key={i}><img src="../images/star-outline.png" /></span>);
  }
  return starJsx;
}

const Review = (props) => {
  console.log(props);
  const product = props.product;
  return (
    <div>
      {
        product.reviews && product.reviews.map(review => (
          <div key={review.id}>
            <h3>{review.title}</h3>
            <h4>By {review.user.email}</h4>
            <div>
              {
                renderStars(review.rating)
              }
            </div>
            <p>{review.content}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Review;
