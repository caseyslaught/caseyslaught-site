import React from "react";
import { useMediaQuery } from "react-responsive";
import { union } from "lodash";

import CommonLayout from "../../layouts/CommonLayout";
import Experiences from "./components/Experiences";
import Map from "./components/Map";
import { StyledHome } from "./styles";
import { useExperiences } from "./hooks";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { experiences, isLoading } = useExperiences();
  const [filteredExperiences, setFilteredExperiences] = React.useState(
    experiences
  );

  React.useEffect(() => {
    if (experiences && experiences.length > 0) {
      setFilteredExperiences(experiences);
    }
  }, [experiences]);

  function onUpdateCategories(newCategories) {
    console.log("newCategories", newCategories);

    if (newCategories.length === 0) {
      setFilteredExperiences(experiences);
    } else {
      setFilteredExperiences(
        experiences.filter((item) => {
          return (
            union(item.tags, newCategories).length <
            item.tags.length + newCategories.length
          );
        })
      );
    }
  }

  return (
    <CommonLayout>
      <StyledHome isMobile={isMobile}>
        <Experiences
          isLoading={isLoading}
          experiences={filteredExperiences}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onUpdateCategories={onUpdateCategories}
        />
        {!isMobile && (
          <Map
            experiences={filteredExperiences}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </StyledHome>
    </CommonLayout>
  );
};

export default Home;
