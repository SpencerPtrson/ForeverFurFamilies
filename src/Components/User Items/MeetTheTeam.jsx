import React from 'react';

export const MeetTheTeam = () => {
        const teamMembers = [
            {
                name: "Spencer Peterson",
                bio: "Spencer loves all animals",
                image: "path-to-spencer-image.jpg" 
            },
            {
                name: "Wyatt Thayer",
                bio: "Wyatt loves birds",
                image: "path-to-bob-image.jpg" 
            }, {
                name: "Justin Nelson",
                bio: "Justin loves cats",
                image: "path-to-justin-image.jpg"
            }, {
                name: "Tito Nanni",
                bio: "Tito loves dogs",
                image: "path-to-tito-image.jpg"
            }
        ];

    return (
        <div>
            <h2>Meet the Team</h2>
            <div>
                {teamMembers.map(member => (
                    <div key={member.name}>
                        <img src={member.image} alt={member.name} />
                        <h3>{member.name}</h3>
                        <p>{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
