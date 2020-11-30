import styled from "styled-components";

export const StyledClusterMarker = styled.div`
  border: 1px solid #cccccc;
  border-radius: 15px;
  padding: 5px 10px;

  background: white;
  color: "#555555";
`;

export const StyledItemMarker = styled.div`
  border: ${(props) =>
    props.isSelected ? "2px solid #aaaaaa" : "1px solid #cccccc;"};
  border-radius: 0px 10px 10px 10px;
  padding: 5px 10px;
  background: white;
  color: ${(props) => (props.isSelected ? "#333333" : "#555555")};
`;
