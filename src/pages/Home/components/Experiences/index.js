import React from "react";
import { Spin } from "antd";
import { useMediaQuery } from "react-responsive";

import MultiSelectFilter from "../../../../components/MultiSelectFilter";
import RadioFilter from "../../../../components/RadioFilter";
import ExperienceItem from "../ExperienceItem";
import { StyledExperiences } from "./styles";

const Experiences = ({
  experiences,
  isLoading,
  selectedItem,
  setSelectedItem,
  onUpdateCategories,
  onUpdateStatus,
}) => {
  const [experienceItems, setExperienceItems] = React.useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  React.useEffect(() => {
    if (experiences && experiences.length > 0) {
      setExperienceItems(
        experiences.map((item) => ({ ...item, isOpen: false }))
      );
    } else {
      setExperienceItems([]);
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
      <div className="experience-header-wrapper">
        <h3 className="experience-title">Experiences</h3>
        <div className="experience-filter-wrapper">
          <MultiSelectFilter
            name="Category"
            options={[
              "Conservation",
              "Education",
              "Entrepreneurship",
              "Retail",
              "Software",
            ]}
            placement={isMobile ? "bottomLeft" : "bottomLeft"}
            onUpdateOptions={onUpdateCategories}
          />
          <RadioFilter
            name="Status"
            options={["Complete", "Ongoing", "Planned"]}
            placement={isMobile ? "bottom" : "bottomLeft"}
            onUpdateSelection={onUpdateStatus}
          />
        </div>
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
