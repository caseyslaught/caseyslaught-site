import React from "react";
import { useMediaQuery } from "react-responsive";

import { StyledLayout } from "./styles";

const CommonLayout = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <StyledLayout isMobile={isMobile}>
      <div className="title-wrapper">
        <h3 className="title">Casey Slaught</h3>
        <h4 className="subtitle">
          I’m a software engineer with a focus on conservation and ecosystem
          science. Check me out!
        </h4>
      </div>

      {children}
    </StyledLayout>
  );
};

export default CommonLayout;
