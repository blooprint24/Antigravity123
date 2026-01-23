import React from 'react';
import { PhoneMissed, Clock, Zap, AlertCircle, Star, Calendar, UserCheck } from 'lucide-react';

const FrictionPoints = () => {
    const points = [
        { icon: <PhoneMissed />, text: "Missed calls during the day" },
        { icon: <Clock />, text: "Slow or inconsistent follow-up" },
        { icon: <Zap />, text: "Leads falling through the cracks" },
        { icon: <AlertCircle />, text: "Customers waiting too long for responses" },
        { icon: <Star />, text: "No system for reviews" },
        { icon: <Calendar />, text: "No-shows and scheduling issues" },
        { icon: <UserCheck />, text: "Everything depends on the owner" },
    ];

    return (
        <section className="section bg-gray-100" id="friction">
            <div className="container">
                <h2 className="section-title reveal">What’s Slowing Your Business Down?</h2>
                <p className="section-intro reveal">Friction is the hidden cost of growth. It's the silent drain on your time, money, and energy.</p>

                <div className="friction-grid">
                    {points.map((point, index) => (
                        <div key={index} className="friction-card reveal">
                            <div className="friction-icon">{point.icon}</div>
                            <p className="friction-text">{point.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FrictionPoints;
