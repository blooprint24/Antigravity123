import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const LeadCapturePopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenShown, setHasBeenShown] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenShown) {
                setIsVisible(true);
                setHasBeenShown(true);
            }
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, [hasBeenShown]);

    if (!isVisible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <button className="close-popup" onClick={() => setIsVisible(false)}>
                    <X size={24} />
                </button>
                <div className="popup-content">
                    <div className="popup-image">
                        <img src="/src/assets/hero.png" alt="Exclusive Drops" />
                    </div>
                    <div className="popup-form-side">
                        <h3 className="heading">NEVER MISS A DROP</h3>
                        <p>Sign up for early access, exclusive releases, and 15% off your first order!</p>
                        <form className="popup-form">
                            <input type="email" placeholder="Your Email Address" required />
                            <input type="text" placeholder="Zip Code (Optional)" />
                            <button type="submit" className="btn-primary full-width">Unlock 15% Off</button>
                        </form>
                        <p className="popup-footer">By signing up, you agree to our Terms and Privacy Policy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadCapturePopup;
