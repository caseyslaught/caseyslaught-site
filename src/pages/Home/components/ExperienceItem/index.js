import React from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";

import { StyledExperienceItem } from "./styles";

const ExperienceItem = ({ item, setItemExpanded, setItemCollapsed }) => {
  const {
    isOpen,
    title,
    organization,
    organization_url,
    organization_description,
    role_description,
    start_date,
    end_date,
  } = item;

  const start_obj = new Date(start_date);
  const start = "Jan " + start_obj.getFullYear();

  let end = "present";
  if (end_date) {
    const end_obj = new Date(end_date);
    end = "Jul " + end_obj.getFullYear();
  }

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
    <StyledExperienceItem isOpen={isOpen}>
      <div className="item-title-wrapper">
        <div className="item-title">
          {title} @{" "}
          <a
            className="organization-link"
            href={organization_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {organization}
          </a>
        </div>
        <div className="item-location">{item.location}</div>
      </div>
      <div className="item-date-range">
        {start} - {end}
      </div>

      <animated.div style={expand} className="expanded-content">
        <div ref={ref}>
          <div className="organization-description">
            {organization_description}
          </div>
          <ul className="role-list">
            {role_description.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </animated.div>

      <div className="item-tags-wrapper">
        {item.tags.map((tag) => (
          <div key={tag} className={"tag tag-" + tag.toLowerCase()}>
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
