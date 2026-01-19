import React from 'react';
import './Team.css';

const Team = () => {
    const teamMembers = [
        {
            name: 'Alex Rivera',
            role: 'Creative Director',
            bio: 'Visionary leader with 15+ years in digital storytelling and AI-powered content creation.'
        },
        {
            name: 'Jordan Chen',
            role: 'Lead AI Engineer',
            bio: 'Machine learning expert specializing in generative AI and computer vision technologies.'
        },
        {
            name: 'Sam Taylor',
            role: 'Senior Producer',
            bio: 'Award-winning producer bringing creative concepts to life with precision and passion.'
        },
        {
            name: 'Morgan Blake',
            role: 'Art Director',
            bio: 'Design innovator crafting stunning visuals that push the boundaries of imagination.'
        }
    ];

    return (
        <section className="team section" id="team">
            <div className="container">
                <h2 className="section-title">Meet The Team</h2>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-card glass">
                            <div className="team-avatar">
                                <div className="avatar-gradient" style={{
                                    background: `radial-gradient(circle at ${30 + index * 20}% ${40 + index * 15}%, 
                    rgba(211, 47, 47, 0.6) 0%, 
                    rgba(26, 26, 26, 0.9) 70%)`
                                }}></div>
                                <div className="avatar-initials">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
