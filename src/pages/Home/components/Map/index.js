import React from "react";
import MapGL, { FlyToInterpolator, Source, Layer } from "react-map-gl";

import Marker from "../Marker";
import { clusterLayer } from "./layers";
import { StyledMap } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const style = "mapbox://styles/mapbox/light-v9";
const EMPTY_STYLE = {
  version: 8,
  sources: {},
  layers: [],
};

const Map = ({ experiences, selectedItem, setSelectedItem }) => {
  const mapContainerRef = React.useRef(null);
  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 11,
    maxZoom: 16,
  });
  const [geojson, setGeojson] = React.useState({});

  console.log(geojson);

  React.useEffect(() => {
    const _geojson = {
      type: "FeatureCollection",
      features: experiences.map(
        ({ longitude, latitude, marker_organization }) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            marker_organization,
          },
        })
      ),
    };
    setGeojson(_geojson);
  }, [experiences]);

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
        <Source
          id="map-source"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={16}
          clusterRadius={50}
        >
          <Layer
            id="point"
            type="circle"
            paint={{
              "circle-radius": 10,
              "circle-color": "#007cbf",
            }}
          />
        </Source>
      </MapGL>
    </StyledMap>
  );

  /*
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
  */
};

export default Map;
