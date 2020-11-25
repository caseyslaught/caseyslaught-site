import React from "react";
import { Marker as MapBoxMarker } from "react-map-gl";

import { StyledMarker } from "./styles";

const Marker = ({ item, isSelected, setSelectedItem }) => {
  const { marker_organization, longitude, latitude } = item;

  return (
    <MapBoxMarker latitude={latitude} longitude={longitude} captureClick={true}>
      <StyledMarker
        isSelected={isSelected}
        onClick={() => {
          if (!isSelected) {
            setSelectedItem(item);
          } else {
            setSelectedItem(null);
          }
        }}
      >
        {marker_organization}
      </StyledMarker>
    </MapBoxMarker>
  );
};

export default Marker;
