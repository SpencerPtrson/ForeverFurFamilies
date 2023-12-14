import React from "react";
import "./MeetTheTeam.css";

export const MeetTheTeam = () => {
  const teamMembers = [
    {
      name: "Spencer Peterson",
      bio: "Spencer loves all animals",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702594687/spencerimage_lgyxjh.png",
    },
    {
      name: "Wyatt Thayer",
      bio: "Wyatt loves birds",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702595711/wyattbees_yzbotb.jpg",
    },
    {
      name: "Justin Nelson",
      bio: "Justin loves cats",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702594878/Justinpic_ejtg66.jpg",
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
            <img src={member.image} alt={member.name} className={member.name}/>
            <h3>{member.name}</h3>
            <p>{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
