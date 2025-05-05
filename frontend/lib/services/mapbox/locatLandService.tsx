import { LandCoordinates, LocateMapReturnType } from "@/lib/models/land";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import * as turf from "@turf/turf";

let allLatandLongs: number[][] = [[]];
let landArea: number = 0;

const locatLandwithMapBox = (): LocateMapReturnType => {
  let map: any;
  let draw: any;
  mapboxgl.accessToken = process.env.MAP_BOX_TOKEN ?? "";

  let allLatitudeandlongtiude: number[][] = [[]];

  map = new mapboxgl.Map({
    container: "Map1",
    style: "mapbox://styles/mapbox/satellite-streets-v12", // set to satellite
    center: [37.5517, 6.0340], // set to addis ababa
    zoom: 13,
  });

  draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
      polygon: true,
      trash: true,
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: "draw_polygon",
  });
  map.addControl(draw);

  const updateArea = () => {
    const data = draw.getAll();
    allLatitudeandlongtiude = data["features"][0]["geometry"]["coordinates"];
    allLatandLongs = allLatitudeandlongtiude;
    if (data) {
      const area = turf.area(data);
      const rounded_area = Math.round(area * 100) / 100;
      landArea = rounded_area;
    }

    let customCoordinates: number[][] =
      allLatitudeandlongtiude[0] as unknown as number[][];
    for (var i = 0; i < customCoordinates.length - 1; i++) {
      var [startLat, startLng] = customCoordinates[i];
      var [endLat, endLng] = customCoordinates[i + 1];

      var segment = turf.lineString([
        [startLng, startLat],
        [endLng, endLat],
      ]);

      var length = turf.length(segment, { units: "meters" });

      var point1 = turf.point([startLat, startLng]);
      var point2 = turf.point([endLat, endLng]);

      var midpoint = turf.midpoint(point1, point2);

      var popupContent = document.createElement("div");
      popupContent.innerHTML = length.toFixed(2) + "m";
      popupContent.style.background = "#FFFFFF";
      popupContent.style.color = "#000000";
      popupContent.style.width = "70px";
      popupContent.style.textAlign = "center";

      var marker = new mapboxgl.Marker(popupContent)
        .setLngLat({
          lng: midpoint.geometry.coordinates[0],
          lat: midpoint.geometry.coordinates[1],
        })
        .addTo(map);

      console.log(marker);
    }
  };

  map.on("draw.create", updateArea);
  map.on("draw.delete", updateArea);
  map.on("draw.update", updateArea);

  return {
    allLatlong: allLatandLongs,
    lArea: landArea,
  };
};

export { locatLandwithMapBox };
