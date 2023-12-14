import React from "react";
import "./MeetTheTeam.css";

export const MeetTheTeam = () => {
  const teamMembers = [
    {
      name: "Spencer Peterson",
      bio: "Spencer loves all animals",
      image: "path-to-spencer-image.jpg",
    },
    {
      name: "Wyatt Thayer",
      bio: "Wyatt loves birds",
      image: "path-to-wyatt-image.jpg",
    },
    {
      name: "Justin Nelson",
      bio: "Justin loves cats",
      image: "path-to-justin-image.jpg",
    },
    {
      name: "Tito Nanni",
      bio: "Tito loves dogs",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702505933/linkedin_profile_pic_gdhjf4.jpg",
    },
  ];

  return (
    <div className="team-container">
      <h2>Meet the Team</h2>
      <div>
        {teamMembers.map((member) => (
          <div key={member.name} className="team-member-card">
            <img src={member.image} alt={member.name} className={member.name === "Tito Nanni" ? "tito-image" : ""}/>
            <h3>{member.name}</h3>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
