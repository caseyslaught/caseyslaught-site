import React from "react";
import MapGL from "react-map-gl";

import { StyledMap } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainerRef = React.useRef(null);

  const style = "mapbox://styles/mapbox/light-v9";
  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 13,
    maxZoom: 16,
  });

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
      />
    </StyledMap>
  );
};

export default Map;
