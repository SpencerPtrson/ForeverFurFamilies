import React from "react";
import "./MeetTheTeam.css";

export const MeetTheTeam = () => {
  const teamMembers = [
    {
      name: "Spencer Peterson",
      bio: "Spencer loves all animals",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702594687/spencerimage_lgyxjh.png",
      linkedIn: "https://www.linkedin.com/in/spencer-peterson-9a81b6198/",
    },
    {
      name: "Wyatt Thayer",
      bio: "Wyatt loves birds",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702595711/wyattbees_yzbotb.jpg",
      linkedIn: "https://www.linkedin.com/in/wyatt-thayer/"
    },
    {
      name: "Justin Nelson",
      bio: "Justin loves cats",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702594878/Justinpic_ejtg66.jpg",
      linkedIn: "https://www.linkedin.com/in/justinnelson3835/"
    },
    {
      name: "Tito Nanni",
      bio: "Tito loves dogs",
      image: "https://res.cloudinary.com/deaxecn0z/image/upload/v1702505933/linkedin_profile_pic_gdhjf4.jpg",
      linkedIn: "https://www.linkedin.com/in/tito-nanni-iv-74a219143/",
    },
  ];

  return (
    <div className="team-container">
      <h2>Meet the Team</h2>
      <div>
        {teamMembers.map((member) => (
          <a href={member.linkedIn} target="_blank" rel="noopener noreferrer" key={member.name} className="team-member-cardlink">
          <div key={member.name} className="team-member-card">
            <img src={member.image} alt={member.name} className={member.name}/>
            <h3>
                {member.name}
              </h3>
            <p>{member.bio}</p>
          </div>
          </a>
        ))}
      </div>
    </div>
  );
};
