import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useSpring } from "react-spring";
import { useMeasure } from "react-use";

import { StyledExperienceItem, StyledContent } from "./styles";

const ExperienceItem = ({ item, setItemExpanded, setItemCollapsed }) => {
  const isOpen = item.isOpen;
  const [ref, { height }] = useMeasure();
  const [contentHeight, setContentHeight] = React.useState(0);
  const expand = useSpring({
    height: isOpen ? contentHeight : 0,
  });

  React.useEffect(() => {
    setContentHeight(height);
    window.addEventListener("resize", setContentHeight(height));
    return window.removeEventListener("resize", setContentHeight(height));
  }, [height]);

  return (
    <StyledExperienceItem>
      <div className="item-title-wrapper">
        <div className="item-title">
          {item.title} @ {item.organization}
        </div>
        <div className="item-location">{item.location}</div>
      </div>
      <div className="item-date-range">
        {item.start_date} - {"present"}
      </div>

      <StyledContent style={expand} isOpen={isOpen}>
        <div ref={ref}>{item.description}</div>
      </StyledContent>

      <div className="item-tags-wrapper">
        {item.tags.map((tag) => (
          <div key={tag} className={"tag tag-" + tag}>
            {tag}
          </div>
        ))}
      </div>

      <div className="item-expand-wrapper">
        {isOpen ? (
          <ChevronUp
            className="chevron-icon"
            onClick={() => setItemCollapsed(item)}
          />
        ) : (
          <ChevronDown
            className="chevron-icon"
            onClick={() => setItemExpanded(item)}
          />
        )}
      </div>
    </StyledExperienceItem>
  );
};

export default ExperienceItem;
