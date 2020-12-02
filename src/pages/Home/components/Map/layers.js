export const itemLayer = {
  id: "item",
  type: "circle",
  source: "map-source",
  paint: {
    "circle-radius": 0,
    "circle-color": "#FFFFFF",
  },
  filter: ["!=", "cluster", true],
};

export const clusterLayer = {
  id: "cluster",
  type: "circle",
  source: "map-source",
  paint: {
    "circle-radius": 0,
    "circle-color": "#FFFFFF",
  },
  filter: ["==", "cluster", true],
};
