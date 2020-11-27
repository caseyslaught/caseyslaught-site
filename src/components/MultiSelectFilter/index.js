import React from "react";
import { Popover, Select } from "antd";
import { useMediaQuery } from "react-responsive";

import { StyledFilter } from "../styles";

const { Option } = Select;

const MultiSelectFilter = ({
  name,
  options,
  onUpdateOptions,
  placement = "bottom",
  placeholder = "Select options",
}) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const selectOptions = options.map((opt) => <Option key={opt}>{opt}</Option>);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  function handleOnChange(values) {
    setSelectedItems(values);
    onUpdateOptions(values);
  }

  const style = isMobile
    ? { minWidth: "75vw" }
    : { minWidth: 200, width: "100%" };

  const content = (
    <Select
      mode="multiple"
      allowClear
      style={style}
      placeholder={placeholder}
      defaultValue={[]}
      onChange={handleOnChange}
    >
      {selectOptions}
    </Select>
  );

  return (
    <StyledFilter>
      <Popover placement={placement} content={content} trigger="click">
        <div className="filter-name">
          {name}
          {selectedItems.length > 0 && ` (${selectedItems.length})`}
        </div>
      </Popover>
    </StyledFilter>
  );
};

export default MultiSelectFilter;
