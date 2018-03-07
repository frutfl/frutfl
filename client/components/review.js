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
    const product = props.product;
    return (
        <div className="review-container">
            {
                product.reviews && product.reviews.map(review => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div>
                                <h3>{review.title}</h3>
                                <p>By {review.user.email}</p>
                            </div>
                            <div>
                                {
                                    renderStars(review.rating)
                                }
                            </div>
                        </div>
                        <p>{review.content}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Review;
