import React from "react";
import { Popover, Radio } from "antd";

import { StyledFilter } from "../styles";

const RadioFilter = ({ name, placement, onUpdateSelection }) => {
  const content = (
    <Radio.Group
      onChange={(e) => onUpdateSelection(e.target.value)}
      defaultValue="all"
    >
      <Radio.Button value="completed">Completed</Radio.Button>
      <Radio.Button value="ongoing">Ongoing</Radio.Button>
      <Radio.Button value="planned">Planned</Radio.Button>
      <Radio.Button value="all">All</Radio.Button>
    </Radio.Group>
  );

  return (
    <StyledFilter>
      <Popover
        className="filter-popover"
        placement={placement}
        content={content}
        trigger="click"
      >
        <div className="filter-name">{name}</div>
      </Popover>
    </StyledFilter>
  );
};

export default RadioFilter;
