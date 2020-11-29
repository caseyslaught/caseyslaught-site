import React from "react";
import MapGL, { FlyToInterpolator, Source, Layer } from "react-map-gl";
import { filter } from "lodash";

import Marker from "../Marker";
import { clusterLayer } from "./layers";
import { StyledMap } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const style = "mapbox://styles/mapbox/light-v9";

const Map = ({ experiences, selectedItem, setSelectedItem }) => {
  const [mapMarkers, setMapMarkers] = React.useState([]);
  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 11,
    maxZoom: 16,
  });

  const [geojson, setGeojson] = React.useState({});
  React.useEffect(() => {
    setGeojson({
      type: "FeatureCollection",
      features: experiences.map(
        ({ id, longitude, latitude, marker_organization }) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            id,
            marker_organization,
          },
        })
      ),
    });
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
    console.log(mapMarkers);
  }, [mapMarkers]);

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

  function updateMarkers() {
    if (mapRef.current) {
      const allFeatures = mapRef.current.queryRenderedFeatures();
      const filteredFeatures = filter(allFeatures, (item) => {
        return (
          item.type === "Feature" &&
          item.layer &&
          item.layer.id === "item-circle"
        );
      });

      const newMarkers = filteredFeatures.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const { id, marker_organization } = feature.properties;

        return {
          longitude,
          latitude,
          marker_organization,
          experience_id: id,
        };
      });

      setMapMarkers(newMarkers);
    }
  }

  function onViewportChange(newViewport) {
    updateMarkers();
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...newViewport,
    }));
  }

  return (
    <StyledMap ref={mapContainerRef}>
      <MapGL
        ref={mapRef}
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
            id="item-circle"
            type="circle"
            source="map-source"
            paint={{
              "circle-radius": 0,
              "circle-color": "red",
            }}
            filter={["!=", "cluster", true]}
          />
          <Layer
            id="cluster-circle"
            type="circle"
            source="map-source"
            paint={{
              "circle-radius": 16,
              "circle-color": "#007cbf",
            }}
            filter={["==", "cluster", true]}
          />
          <Layer
            id="cluster-text"
            type="symbol"
            source="map-source"
            layout={{
              "text-field": "cluster!",
            }}
            paint={{ "text-color": "black" }}
            filter={["==", "cluster", true]}
          />
        </Source>

        {mapMarkers.map((item) => (
          <Marker
            key={item.id}
            item={item}
            isSelected={selectedItem && selectedItem.id === item.id}
            setSelectedItem={setSelectedItem}
          >
            <div>marker_organization</div>
          </Marker>
        ))}
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
