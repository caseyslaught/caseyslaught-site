import React from "react";

import ExperienceItem from "../ExperienceItem";
import { StyledExperiences } from "./styles";

const Experiences = ({ experiences }) => {
  return (
    <StyledExperiences>
      <div className="experience-title-wrapper">
        <h3 className="experience-title">Experiences</h3>
      </div>
      <div className="experience-list-wrapper">
        {experiences.map((item) => (
          <ExperienceItem key={item.id} item={item} />
        ))}
      </div>
    </StyledExperiences>
  );
};

export default Experiences;
