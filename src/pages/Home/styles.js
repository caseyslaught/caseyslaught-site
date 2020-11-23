import styled from "styled-components";

export const StyledHome = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: ${(props) => (props.isMobile ? "inherit" : "white")};

  border: ${(props) => (props.isMobile ? "none" : "1px solid #fafafa")};
  border-radius: ${(props) => (props.isMobile ? "0px" : "0px")};
  box-shadow: ${(props) => (props.isMobile ? "none" : "0px 0px 5px #999999")};
`;
