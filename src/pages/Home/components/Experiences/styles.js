import styled from "styled-components";

export const StyledExperiences = styled.div`
  flex: 2;
  min-width: 0;
  text-align: left;
  height: 100%;
  display: flex;
  flex-direction: column;

  .experience-header-wrapper {
    margin: 0px;
    padding: 20px;
    border-bottom: 1px solid #cccccc;
  }

  .experience-title {
    font-size: 1.6em;
    color: #555555;
  }

  .experience-filter-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .experience-list-wrapper {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.isLoading ? "center" : "stretch")};
    justify-content: ${(props) => (props.isLoading ? "center" : "flex-start")};

    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    ::-webkit-scrollbar {
      /* WebKit */
      width: 0;
      height: 0;
    }
  }
`;
