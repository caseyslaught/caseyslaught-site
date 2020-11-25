import React from "react";
import { useMediaQuery } from "react-responsive";

import CommonLayout from "../../layouts/CommonLayout";
import Experiences from "./components/Experiences";
import Map from "./components/Map";
import { StyledHome } from "./styles";
import { useExperiences } from "./hooks";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [selectedItem, setSelectedItem] = React.useState(null);
  const { experiences, isLoading } = useExperiences();

  return (
    <CommonLayout>
      <StyledHome isMobile={isMobile}>
        <Experiences
          isLoading={isLoading}
          experiences={experiences}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        {!isMobile && (
          <Map
            experiences={experiences}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </StyledHome>
    </CommonLayout>
  );
};

export default Home;
