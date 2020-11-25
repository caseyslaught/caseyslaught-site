import React from "react";
import MapGL, { FlyToInterpolator } from "react-map-gl";

import Marker from "../Marker";
import { StyledMap } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ({ experiences, selectedItem, setSelectedItem }) => {
  const mapContainerRef = React.useRef(null);
  const style = "mapbox://styles/mapbox/light-v9";
  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 12,
    maxZoom: 16,
  });

  React.useEffect(() => {
    if (selectedItem) {
      setViewport((oldViewport) => ({
        ...oldViewport,
        longitude: selectedItem.longitude,
        latitude: selectedItem.latitude,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
        transitionDuration: "auto",
      }));
    }
  }, [selectedItem]);

  React.useEffect(() => {
    function updateViewport() {
      onViewportChange({
        width: mapContainerRef.current.clientWidth + 2,
        height: mapContainerRef.current.clientHeight,
      });
    }
    window.addEventListener("resize", updateViewport);
    updateViewport();
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  function onViewportChange(newViewport) {
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...newViewport,
    }));
  }

  return (
    <StyledMap ref={mapContainerRef}>
      <MapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={style}
        onViewportChange={(newViewport) => onViewportChange(newViewport)}
      >
        {experiences.map((item) => (
          <Marker
            key={item.id}
            item={item}
            isSelected={selectedItem && selectedItem.id === item.id}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </MapGL>
    </StyledMap>
  );
};

export default Map;
