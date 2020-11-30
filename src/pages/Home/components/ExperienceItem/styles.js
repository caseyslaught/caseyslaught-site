import styled from "styled-components";

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

  .organization-link {
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
  }

  .item-tags-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .tag {
    font-size: 0.9em;
    color: white;
    border-radius: 10px;
    padding: 3px 10px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .tag-conservation {
    background: #5a739c;
  }

  .tag-education {
    background: #5c989c;
  }

  .tag-entrepreneurship {
    background: #628a64;
  }

  .tag-retail {
    background: #8f6356;
  }

  .tag-software {
    background: #7d5c80;
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

  .expanded-content {
    overflow: hidden;
    font-size: 1em;
    color: #555555;
    margin-bottom: ${(props) => (props.isOpen ? "20px" : "0px")};
  }

  .organization-description {
    margin-bottom: 10px;
  }

  .role-list {
  }
`;
