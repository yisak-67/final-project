import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.MAP_BOX_TOKEN || "";

interface DisplayLandProps {
  latandlongs: string | number[][][] | undefined;
  index: number;
}

const DisplayLand: React.FC<DisplayLandProps> = ({ latandlongs, index }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip if no container or no coordinates
    if (!mapContainer.current) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Handle undefined or empty coordinates
      if (!latandlongs) {
        throw new Error("No coordinates provided");
      }

      console.log("Raw coordinates input:", latandlongs);

      let coordinates: number[][];
      
      // Case 1: Already parsed array
      if (Array.isArray(latandlongs)) {
        coordinates = latandlongs[0]; // Take first element if nested array
      } 
      // Case 2: String that needs parsing
      else if (typeof latandlongs === 'string') {
        try {
          const parsed = JSON.parse(latandlongs);
          coordinates = Array.isArray(parsed[0]?.[0]) ? parsed[0] : parsed;
        } catch (parseError) {
          throw new Error(`Invalid JSON format: ${latandlongs}`);
        }
      } else {
        throw new Error("Unsupported coordinates format");
      }

      console.log("Processed coordinates:", coordinates);

      // Validate coordinates structure
      if (!coordinates || coordinates.length < 3) {
        throw new Error("At least 3 coordinate points required");
      }

      // Validate each coordinate pair
      const isValid = coordinates.every(coord => 
        Array.isArray(coord) && 
        coord.length === 2 && 
        !isNaN(coord[0]) && 
        !isNaN(coord[1])
      );

      if (!isValid) {
        throw new Error("Invalid coordinate values detected");
      }

      // Initialize map
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [coordinates[0][0], coordinates[0][1]],
        zoom: 16,
        antialias: true
      });

      mapRef.current = map;

      map.on("load", () => {
        try {
          map.addSource(`land-${index}`, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [coordinates]
              },
              properties: {}
            }
          });

          map.addLayer({
            id: `land-fill-${index}`,
            type: "fill",
            source: `land-${index}`,
            paint: {
              "fill-color": "#0080ff",
              "fill-opacity": 0.5
            }
          });

          map.addLayer({
            id: `land-outline-${index}`,
            type: "line",
            source: `land-${index}`,
            paint: {
              "line-color": "#000",
              "line-width": 3
            }
          });

          addDistanceMarkers(map, coordinates);
          setIsLoading(false);
        } catch (layerError) {
          throw new Error(`Failed to add map layers: ${layerError.message}`);
        }
      });

      map.on("error", (e) => {
        throw new Error(`Map error: ${e.error?.message || "Unknown map error"}`);
      });

      return () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };

    } catch (error) {
      console.error("Map rendering error:", error);
      setError(error instanceof Error ? error.message : "Map display failed");
      setIsLoading(false);
    }
  }, [latandlongs, index]);

  const addDistanceMarkers = (map: mapboxgl.Map, coordinates: number[][]) => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    for (let i = 0; i < coordinates.length - 1; i++) {
      try {
        const [startLng, startLat] = coordinates[i];
        const [endLng, endLat] = coordinates[i + 1];

        const segment = turf.lineString([[startLng, startLat], [endLng, endLat]]);
        const length = turf.length(segment, { units: "meters" });
        const midpoint = turf.midpoint(
          turf.point([startLng, startLat]),
          turf.point([endLng, endLat])
        );

        const popup = document.createElement("div");
        popup.innerHTML = `${length.toFixed(2)}m`;
        Object.assign(popup.style, {
          background: "#FFFFFF",
          color: "#000000",
          width: "70px",
          textAlign: "center",
          padding: "4px",
          borderRadius: "4px",
          fontSize: "12px"
        });

        const marker = new mapboxgl.Marker({ element: popup })
          .setLngLat(midpoint.geometry.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      } catch (markerError) {
        console.error("Marker error:", markerError);
      }
    }
  };

  return (
    <div>
      <div
        ref={mapContainer}
        id={`Map-${index}`}
        className="rounded-[15px] object-contain h-[350px] w-[400px] relative"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 rounded-[15px]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-4 rounded-[15px]">
            <div className="text-center">
              <p className="font-bold text-red-600">Map Error</p>
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 px-3 py-1 bg-red-100 rounded text-sm"
              >
                Reload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayLand;