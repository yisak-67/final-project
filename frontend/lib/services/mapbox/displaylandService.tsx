// src/lib/mapbox/displayLandCoordinateswithMapbox.ts
import { LandCoordinates } from "@/lib/models/land";
import mapboxgl from "mapbox-gl";


// Ensure Mapbox access token is set
mapboxgl.accessToken = process.env.MAP_BOX_TOKEN ?? "";
if (!mapboxgl.accessToken) {
  console.error("Mapbox access token is missing!");
}

export const displayLandCoordinateswithMapbox = (
  inputCoordinates: LandCoordinates,
  index: number
) => {
  const map = new mapboxgl.Map({
    container: `Map-${index}`,
    style: "mapbox://styles/mapbox/satellite-streets-v12",
    center: [inputCoordinates.coordinates[0][0], inputCoordinates.coordinates[0][1]],
    zoom: 16,
  });

  map.on("load", () => {
    const sourceId = `maine-${index}`;
    const layerId = `maine-fill-${index}`;
    const outlineId = `maine-outline-${index}`;

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [inputCoordinates.coordinates],
          },
          properties: {},
        },
      });

      map.addLayer({
        id: layerId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: outlineId,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "#000",
          "line-width": 3,
        },
      });
    }
  });
};