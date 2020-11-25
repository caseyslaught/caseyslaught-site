import React from "react";

import ExperienceItem from "../ExperienceItem";
import { StyledExperiences } from "./styles";

const Experiences = ({ defaultExperiences, selectedItem, setSelectedItem }) => {
  const [experiences, setExperiences] = React.useState(
    defaultExperiences.map((item) => ({ isOpen: false, ...item }))
  );

  React.useEffect(() => {
    if (selectedItem) {
      setExperiences((prevExperiences) => {
        return prevExperiences.map((item) => ({
          ...item,
          isOpen: item.id === selectedItem.id,
        }));
      });
    } else {
      setExperiences((prevExperiences) => {
        return prevExperiences.map((item) => ({
          ...item,
          isOpen: false,
        }));
      });
    }
  }, [selectedItem]);

  const setItemExpanded = (targetItem) => {
    if (selectedItem === null || targetItem.id !== selectedItem.id) {
      setSelectedItem(targetItem);
    }
    setExperiences((prevExperiences) => {
      return prevExperiences.map((item) => ({
        ...item,
        isOpen: item.id === targetItem.id,
      }));
    });
  };

  const setItemCollapsed = (targetItem) => {
    setSelectedItem(null);
    setExperiences((prevExperiences) => {
      return prevExperiences.map((item) => {
        if (item.id === targetItem.id) {
          return { ...item, isOpen: false };
        } else {
          return item;
        }
      });
    });
  };

  return (
    <StyledExperiences>
      <div className="experience-title-wrapper">
        <h3 className="experience-title">Experiences</h3>
      </div>
      <div className="experience-list-wrapper">
        {experiences.map((item) => (
          <ExperienceItem
            key={item.id}
            item={item}
            isSelected={selectedItem && selectedItem.id === item.id}
            setItemExpanded={setItemExpanded}
            setItemCollapsed={setItemCollapsed}
          />
        ))}
      </div>
    </StyledExperiences>
  );
};

export default Experiences;
