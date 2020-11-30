import React from "react";
import { Marker as MapBoxMarker } from "react-map-gl";

import { StyledClusterMarker, StyledItemMarker } from "./styles";

export const ClusterMarker = ({ count, longitude, latitude, onClick }) => {
  return (
    <MapBoxMarker latitude={latitude} longitude={longitude} captureClick={true}>
      <StyledClusterMarker
        onClick={onClick}
      >{`(${count})`}</StyledClusterMarker>
    </MapBoxMarker>
  );
};

export const ItemMarker = ({ item, isSelected, setSelectedItem }) => {
  const { marker_organization, longitude, latitude } = item;

  return (
    <MapBoxMarker latitude={latitude} longitude={longitude} captureClick={true}>
      <StyledItemMarker
        isSelected={isSelected}
        onClick={() => {
          if (!isSelected) {
            setSelectedItem({ item, how: "map" });
          } else {
            setSelectedItem(null);
          }
        }}
      >
        {marker_organization}
      </StyledItemMarker>
    </MapBoxMarker>
  );
};
