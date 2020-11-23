import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useSpring, a, animated } from "react-spring";

import { useMeasure } from "./hooks";
import { StyledExperienceItem, StyledContent } from "./styles";

const ExperienceItem = ({ item, defaultIsOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(100px,0,0)" },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 100}px,0,0)`,
    },
  });

  const chevronColor = "#aaaaaa";
  const chevronSize = 32;

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

      <StyledContent
        style={{ opacity, height: isOpen ? "auto" : height }}
        {...bind}
      >
        <a.div style={{ marginBottom: 20, ...transform }} {...bind}>
          {item.description}
        </a.div>
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
            color={chevronColor}
            size={chevronSize}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <ChevronDown
            color={chevronColor}
            size={chevronSize}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
    </StyledExperienceItem>
  );
};

export default ExperienceItem;
