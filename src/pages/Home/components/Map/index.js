import React from "react";
import MapGL, { FlyToInterpolator, Source, Layer } from "react-map-gl";
import { filter, uniqBy } from "lodash";

import { ClusterMarker, ItemMarker } from "../Marker";
import { clusterLayer, itemLayer } from "./layers";
import { StyledMap } from "./styles";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const style = "mapbox://styles/mapbox/light-v9";

const Map = ({ mapWidth, experiences, selectedItem, setSelectedItem }) => {
  const [clusterMarkers, setClusterMarkers] = React.useState([]);
  const [itemMarkers, setItemMarkers] = React.useState([]);
  const [geojson, setGeojson] = React.useState({});
  const [viewport, setViewport] = React.useState({
    width: 0,
    height: 0,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 11,
    maxZoom: 16,
  });

  const mapContainerRef = React.useRef(null);
  const mapRef = React.useRef(null);

  // update geojson when experiences change
  React.useEffect(() => {
    setGeojson({
      type: "FeatureCollection",
      features: experiences.map(({ id, longitude, latitude, marker_text }) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        properties: {
          id,
          marker_text,
        },
      })),
    });
  }, [experiences]);

  // update viewport when selectedItem changes, zoom to that item
  React.useEffect(() => {
    if (selectedItem) {
      // if only interpolating zoom, then it crashes (math.gl problem)
      // https://github.com/visgl/react-map-gl/issues/969

      const {
        longitude: selectedLongitude,
        latitude: selectedLatitude,
      } = selectedItem.item;

      setViewport((oldViewport) => {
        const {
          longitude: currentLongitude,
          latitude: currentLatitude,
        } = oldViewport;

        if (
          Math.abs(selectedLatitude - currentLatitude) > 0.03 &&
          Math.abs(selectedLongitude - currentLongitude) > 0.03
        ) {
          return {
            ...oldViewport,
            longitude: selectedItem.item.longitude,
            latitude: selectedItem.item.latitude,
            zoom: 14,
            transitionInterpolator: new FlyToInterpolator({ speed: 1.3 }),
            transitionDuration: "auto",
          };
        } else {
          return {
            ...oldViewport,
            longitude: selectedItem.item.longitude,
            latitude: selectedItem.item.latitude,
            zoom: 14,
          };
        }
      });
    }
  }, [selectedItem]);

  // resize map when new mapWidth passed from parent component
  React.useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      width: mapWidth,
      height: mapContainerRef.current.clientHeight,
    }));
  }, [mapWidth]);

  React.useEffect(() => {
    // can't figure out how to do a source.onLoad callback so this
    // is the ugly workaround...
    setTimeout(function () {
      updateMarkers();
    }, 200);
  }, [geojson]);

  function updateMarkers() {
    if (mapRef.current) {
      const allFeatures = mapRef.current.queryRenderedFeatures();
      const items = filter(allFeatures, (item) => {
        return (
          item.type === "Feature" && item.layer && item.layer.id === "item"
        );
      });

      const clusters = filter(allFeatures, (item) => {
        return (
          item.type === "Feature" && item.layer && item.layer.id === "cluster"
        );
      });

      const itemMarkers = items.map((feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const { id, marker_text } = feature.properties;
        return {
          id,
          longitude,
          latitude,
          marker_text,
        };
      });

      const clusterMarkers = clusters.map((cluster) => {
        const { id, geometry, properties } = cluster;
        const [longitude, latitude] = geometry.coordinates;
        const { point_count_abbreviated } = properties;
        return {
          id,
          longitude,
          latitude,
          count: point_count_abbreviated,
        };
      });

      setClusterMarkers(uniqBy(clusterMarkers, "id"));
      setItemMarkers(uniqBy(itemMarkers, "id"));
    }
  }

  function onViewportChange(newViewport) {
    setViewport((oldViewport) => ({
      ...oldViewport,
      ...newViewport,
    }));
    updateMarkers();
  }

  function onClusterClick(longitude, latitude) {
    onViewportChange({
      longitude,
      latitude,
      zoom: viewport.zoom + 2,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.3 }),
      transitionDuration: "auto",
    });
  }

  return (
    <StyledMap ref={mapContainerRef}>
      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={style}
        onViewportChange={(newViewport) => onViewportChange(newViewport)}
        onLoad={() => {
          updateMarkers();
        }}
      >
        <Source
          id="map-source"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={16}
          clusterRadius={50}
        >
          <Layer {...itemLayer} />
          <Layer {...clusterLayer} />
        </Source>

        {itemMarkers.map((item) => (
          <ItemMarker
            key={item.id}
            item={item}
            isSelected={
              selectedItem &&
              selectedItem.item &&
              selectedItem.item.id === item.id
            }
            setSelectedItem={setSelectedItem}
          />
        ))}

        {clusterMarkers.map(({ id, count, longitude, latitude }) => (
          <ClusterMarker
            key={id}
            count={count}
            longitude={longitude}
            latitude={latitude}
            onClick={() => onClusterClick(longitude, latitude)}
          />
        ))}
      </MapGL>
    </StyledMap>
  );
};

export default Map;
