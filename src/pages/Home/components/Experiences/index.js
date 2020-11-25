import React from "react";
import { Spin } from "antd";

import ExperienceItem from "../ExperienceItem";
import { StyledExperiences } from "./styles";

const Experiences = ({
  experiences,
  isLoading,
  selectedItem,
  setSelectedItem,
}) => {
  const [experienceItems, setExperienceItems] = React.useState([]);

  React.useEffect(() => {
    if (experiences && experiences.length > 0) {
      setExperienceItems(
        experiences.map((item) => ({ ...item, isOpen: false }))
      );
    }
  }, [experiences]);

  React.useEffect(() => {
    if (selectedItem) {
      setExperienceItems((prevExperiences) => {
        return prevExperiences.map((item) => ({
          ...item,
          isOpen: item.id === selectedItem.id,
        }));
      });
    } else {
      setExperienceItems((prevExperiences) => {
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
    setExperienceItems((prevExperiences) => {
      return prevExperiences.map((item) => ({
        ...item,
        isOpen: item.id === targetItem.id,
      }));
    });
  };

  const setItemCollapsed = (targetItem) => {
    setSelectedItem(null);
    setExperienceItems((prevExperiences) => {
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
    <StyledExperiences isLoading={isLoading}>
      <div className="experience-title-wrapper">
        <h3 className="experience-title">Experiences</h3>
      </div>
      <div className="experience-list-wrapper">
        {isLoading ? (
          <Spin />
        ) : (
          experienceItems.map((item) => (
            <ExperienceItem
              key={item.id}
              item={item}
              isSelected={selectedItem && selectedItem.id === item.id}
              setItemExpanded={setItemExpanded}
              setItemCollapsed={setItemCollapsed}
            />
          ))
        )}
      </div>
    </StyledExperiences>
  );
};

export default Experiences;
