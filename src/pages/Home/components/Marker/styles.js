import styled from "styled-components";

export const StyledMarker = styled.div`
  border: 1px solid #cccccc;
  border-radius: 0px 10px 10px 10px;
  padding: 5px 10px;

  background: ${(props) => (props.isSelected ? "#999999" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "#555555")};
`;
