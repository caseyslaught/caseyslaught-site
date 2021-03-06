import styled from "styled-components";

export const StyledLayout = styled.div`
  height: ${(props) => (props.isMobile ? "auto" : "100%")};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  padding: ${(props) =>
    props.isMobile ? "5px 10px 0px 10px" : "20px 20px 60px 20px"};

  .title-wrapper {
    width: 100%;
    max-width: 500px;
  }

  .title {
    font-size: 2em;
  }

  .subtitle {
    font-size: 1.2em;
  }
`;
