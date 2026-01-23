import React from 'react';
import { MousePointerClick, MessageSquare, CalendarClock, ShieldCheck, UserPlus, BarChart3 } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <MousePointerClick />,
            title: "Lead capture & instant response",
            desc: "Stop losing customers who move to the next competitor when you don't answer."
        },
        {
            icon: <MessageSquare />,
            title: "Automated follow-up",
            desc: "Stay top-of-mind without lifting a finger. Consistent communication is key."
        },
        {
            icon: <CalendarClock />,
            title: "Booking & reminders",
            desc: "Let your customers schedule themselves and get reminded automatically."
        },
        {
            icon: <ShieldCheck />,
            title: "Reputation management",
            desc: "Collect and display reviews to build trust while you sleep."
        },
        {
            icon: <UserPlus />,
            title: "Customer re-engagement",
            desc: "Bring past customers back with smart, timely notifications."
        },
        {
            icon: <BarChart3 />,
            title: "Visible visibility",
            desc: "Simple dashboards so you always know exactly how your business is performing."
        }
    ];

    return (
        <section className="section bg-gray-100" id="services">
            <div className="container">
                <h2 className="section-title reveal">Our Capabilities</h2>
                <p className="section-intro reveal">Everything you need to modernize your growth, delivered as a complete system.</p>

                <div className="grid grid-3">
                    {services.map((service, index) => (
                        <div key={index} className="service-card reveal">
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
