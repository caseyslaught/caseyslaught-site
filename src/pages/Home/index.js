import React from "react";
import { useMediaQuery } from "react-responsive";

import CommonLayout from "../../layouts/CommonLayout";
import Experiences from "./components/Experiences";
import Map from "./components/Map";
import { StyledHome } from "./styles";

const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const experiences = [
    {
      id: 1,
      title: "Founder/CTO",
      organization: "Caracal",
      location: "Kigali, Rwanda",
      start_date: "01-01-2018",
      end_date: null,
      description:
        "Caracal is a geospatial data automation platform for protected areas. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["startup", "software"],
    },
    {
      id: 2,
      title: "Technology Officer",
      organization: "Virunga National park",
      location: "Rumangabo, Democratic Republic of the Congo",
      start_date: "01-01-2016",
      end_date: "01-07-2017",
      description:
        "Virunga National Park is the oldest national park in Africa and one of the most biodiverse. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["government", "software"],
    },
  ];

  return (
    <CommonLayout>
      <StyledHome isMobile={isMobile}>
        <Experiences defaultExperiences={experiences} />
        {!isMobile && <Map />}
      </StyledHome>
    </CommonLayout>
  );
};

export default Home;