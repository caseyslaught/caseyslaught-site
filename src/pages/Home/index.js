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
  const [categories, setCategories] = React.useState([]);
  const [status, setStatus] = React.useState();

  React.useEffect(() => {
    if (experiences && experiences.length > 0) {
      setFilteredExperiences(experiences);
    }
  }, [experiences]);

  React.useEffect(() => {
    let newExperiences = [...experiences];

    if (categories.length > 0) {
      // is this efficient?
      newExperiences = newExperiences.filter((item) => {
        return (
          union(item.tags, categories).length <
          item.tags.length + categories.length
        );
      });
    }

    if (status && status !== "all") {
      const today = new Date();
      if (status === "completed") {
        newExperiences = newExperiences.filter((item) => {
          return item.end_date && new Date(item.end_date) < today;
        });
      } else if (status === "planned") {
        newExperiences = newExperiences.filter((item) => {
          return new Date(item.start_date) > today;
        });
      } else {
        newExperiences = newExperiences.filter((item) => {
          return item.end_date == null && new Date(item.start_date) < today;
        });
      }
    }

    setFilteredExperiences(newExperiences);
  }, [experiences, categories, status]);

  return (
    <CommonLayout>
      <StyledHome isMobile={isMobile}>
        <Experiences
          isLoading={isLoading}
          experiences={filteredExperiences}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onUpdateCategories={setCategories}
          onUpdateStatus={setStatus}
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
