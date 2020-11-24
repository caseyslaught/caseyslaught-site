import styled from "styled-components";
import { animated } from "react-spring";

export const StyledExperienceItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #aaaaaa;
  margin-bottom: 20px;

  .item-title-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
  }

  .item-title {
    font-size: 1.3em;
    color: #555555;
  }

  .item-location {
    font-size: 1em;
    color: #999999;
    text-align: right;
  }

  .item-date-range {
    font-size: 1em;
    color: #999999;
    margin-bottom: 10px;
  }

  .item-tags-wrapper {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .tag {
    font-size: 0.9em;
    color: white;
    border-radius: 10px;
    padding: 3px 10px;
    margin-right: 10px;
  }

  .tag-startup {
    background: #7b9379;
  }

  .tag-software {
    background: #797f93;
  }

  .tag-retail {
    background: #8c7993;
  }

  .tag-government {
    background: #16548a;
  }

  .item-expand-wrapper {
    width: 100%;
    text-align: center;
    z-index: 10;
  }

  .item-expand-wrapper .chevron-icon {
    color: #aaaaaa;
    font-size: 0.8em;
  }
`;

export const StyledContent = styled(animated.div)`
  overflow: hidden;
  font-size: 1em;
  color: #555555;
  margin-bottom: ${(props) => (props.isOpen ? "20px" : "0px")};
`;