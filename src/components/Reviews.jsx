import React from 'react';
import './Reviews.css';

const reviews = [
    {
        name: "James T.",
        text: "Ace Terrain transformed our backyard. Their attention to detail in the flower beds was exceptional. Highly recommend for anyone in Baton Rouge!",
        rating: 5
    },
    {
        name: "Sarah M.",
        text: "Professional, punctual, and very talented. Our new patio looks amazing and the team was a pleasure to work with.",
        rating: 5
    },
    {
        name: "Robert K.",
        text: "Best tree service I've used. They were safe, efficient, and left the area cleaner than when they arrived.",
        rating: 5
    },
    {
        name: "Linda P.",
        text: "The weekly lawn maintenance has been a game changer for our curb appeal. 5 stars all the way.",
        rating: 5
    },
    {
        name: "Michael W.",
        text: "Quality landscaping is hard to find, but Ace Terrain delivered exactly what we dreamed of. Very sustainable and beautiful.",
        rating: 5
    }
];

const Reviews = () => {
    return (
        <section id="reviews" className="reviews-section">
            <div className="container">
                <div className="reviews-header">
                    <div className="google-badge">
                        <span className="google-text">Google</span>
                        <div className="rating-pill">
                            <span className="pill-score">5.0</span>
                            <span className="pill-stars">★★★★★</span>
                            <span className="pill-count">5 Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="reviews-slider">
                    {reviews.map((review, index) => (
                        <div className="review-card" key={index}>
                            <div className="review-stars">{"★".repeat(review.rating)}</div>
                            <p className="review-text">"{review.text}"</p>
                            <div className="review-author">
                                <span className="author-name">{review.name}</span>
                                <span className="verified-badge">Verified Customer</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
