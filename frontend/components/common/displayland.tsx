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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    setIsLoading(true);
    setError(null);

    try {
      if (!latandlongs) throw new Error("No coordinates provided");

      let coordinates: number[][];

      if (Array.isArray(latandlongs)) {
        coordinates = latandlongs[0];
      } else if (typeof latandlongs === 'string') {
        try {
          const parsed = JSON.parse(latandlongs);
          coordinates = Array.isArray(parsed[0]?.[0]) ? parsed[0] : parsed;
        } catch (parseError) {
          throw new Error(`Invalid JSON format`);
        }
      } else {
        throw new Error("Unsupported coordinates format");
      }

      if (!coordinates || coordinates.length < 3) {
        throw new Error("At least 3 coordinate points required");
      }

      // Calculate the bounding box for better view
      const bbox = turf.bbox(turf.polygon([coordinates])).slice(0, 4) as [number, number, number, number];
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        bounds: bbox as [number, number, number, number],
        fitBoundsOptions: {
          padding: isMobile ? 20 : 50, // Less padding on mobile
          maxZoom: 18 // Limit maximum zoom
        },
        antialias: true,
        interactive: true,
        touchZoomRotate: true
      });

      mapRef.current = map;

      map.on("load", () => {
        try {
          // Add land polygon with more stylish appearance
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

          // Main fill layer with gradient effect
          map.addLayer({
            id: `land-fill-${index}`,
            type: "fill",
            source: `land-${index}`,
            paint: {
              "fill-color": "#3b82f6", // Tailwind blue-500
              "fill-opacity": 0.4,
              "fill-outline-color": "#22c55e" // Tailwind green-500
            }
          });

          // Inner glow effect
          map.addLayer({
            id: `land-glow-${index}`,
            type: "fill",
            source: `land-${index}`,
            paint: {
              "fill-color": "#60a5fa", // Tailwind blue-300
              "fill-opacity": 0.2,
              "fill-translate": [0, 0]
            }
          });

          // Outline with better visibility
          map.addLayer({
            id: `land-outline-${index}`,
            type: "line",
            source: `land-${index}`,
            paint: {
              "line-color": "#1d4ed8", // Tailwind blue-700
              "line-width": isMobile ? 2 : 3,
              "line-opacity": 0.8,
              "line-dasharray": [2, 2]
            }
          });

          // Add markers with improved styling
          addDistanceMarkers(map, coordinates);

          // Add a marker at each vertex
          addVertexMarkers(map, coordinates);

          setIsLoading(false);
        } catch (layerError) {
          console.error("Map layer error:", layerError);
          setError(`Map rendering failed: ${layerError}`);
          setIsLoading(false);
        }
      });

      map.on('error', (err) => {
        console.error("Mapbox GL error:", err);
        setError("Failed to load map");
        setIsLoading(false);
      });

      return () => {
        markersRef.current.forEach(marker => marker.remove());
        if (mapRef.current) mapRef.current.remove();
      };

    } catch (error) {
      setError(error instanceof Error ? error.message : "Map display failed");
      setIsLoading(false);
    }
  }, [latandlongs, index, isMobile]);

  const addVertexMarkers = (map: mapboxgl.Map, coordinates: number[][]) => {
    coordinates.forEach((coord, i) => {
      const el = document.createElement('div');
      el.className = 'vertex-marker';
      Object.assign(el.style, {
        width: isMobile ? '12px' : '16px',
        height: isMobile ? '12px' : '16px',
        backgroundColor: '#2563eb', // Tailwind blue-600
        borderRadius: '50%',
        border: '2px solid white',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      });

      new mapboxgl.Marker(el)
        .setLngLat([coord[0], coord[1]])
        .addTo(map);
    });
  };

  const addDistanceMarkers = (map: mapboxgl.Map, coordinates: number[][]) => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    for (let i = 0; i < coordinates.length; i++) {
      try {
        const nextIndex = (i + 1) % coordinates.length;
        const [startLng, startLat] = coordinates[i];
        const [endLng, endLat] = coordinates[nextIndex];

        const segment = turf.lineString([[startLng, startLat], [endLng, endLat]]);
        const length = turf.length(segment, { units: "meters" });
        const midpoint = turf.midpoint(
          turf.point([startLng, startLat]),
          turf.point([endLng, endLat])
        );

        const popup = document.createElement("div");
        popup.className = "distance-marker";
        popup.innerHTML = `<span class="font-semibold">${length.toFixed(2)}m</span>`;
        Object.assign(popup.style, {
          background: "#f9fafb", // Tailwind gray-50
          color: "#1e3a8a", // Tailwind indigo-800
          width: isMobile ? "60px" : "70px",
          padding: isMobile ? "6px 4px" : "8px 6px",
          fontSize: isMobile ? "10px" : "12px",
          borderRadius: "0.75rem", // Tailwind rounded-lg
          textAlign: "center",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          fontWeight: "500",
          border: "1px solid #3b82f6" // Tailwind blue-500
        });

        const marker = new mapboxgl.Marker({
          element: popup,
          anchor: 'center',
          offset: [0, -10] // Adjust to prevent overlap with midpoint
        }).setLngLat(midpoint.geometry.coordinates as [number, number])
          .addTo(map);

        markersRef.current.push(marker);
      } catch (error) {
        console.error("Marker error:", error);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        ref={mapContainer}
        className={`
          rounded-lg shadow-md border border-gray-200
          h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]
          w-full
          relative overflow-hidden
        `}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/75 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-red-50/90 flex items-center justify-center p-6 rounded-lg">
            <div className="text-center max-w-xs">
              <p className="font-bold text-red-600 text-sm sm:text-base mb-2">Map Error</p>
              <p className="text-red-500 text-xs sm:text-sm mb-3">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-100 rounded-md text-red-600 text-xs sm:text-sm hover:bg-red-200 transition"
              >
                Reload Map
              </button>
            </div>
          </div>
        )}
      </div>

      {isMobile && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Pinch to zoom • Tap markers for details
        </p>
      )}
    </div>
  );
};

export default DisplayLand;