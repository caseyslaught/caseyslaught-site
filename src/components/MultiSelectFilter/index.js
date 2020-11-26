import React from "react";
import { Popover, Select } from "antd";

import { StyledMultiSelectFilter } from "./styles";

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

  function handleOnChange(values) {
    setSelectedItems(values);
    onUpdateOptions(values);
  }

  const content = (
    <Select
      mode="multiple"
      allowClear
      style={{ minWidth: 200, width: "100%" }}
      placeholder={placeholder}
      defaultValue={[]}
      onChange={handleOnChange}
    >
      {selectOptions}
    </Select>
  );

  return (
    <StyledMultiSelectFilter>
      <Popover placement={placement} content={content} trigger="click">
        <div className="select-name">
          {name}
          {selectedItems.length > 0 && ` (${selectedItems.length})`}
        </div>
      </Popover>
    </StyledMultiSelectFilter>
  );
};

export default MultiSelectFilter;
