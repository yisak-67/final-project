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

  // Check mobile viewport on mount and resize
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

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [coordinates[0][0], coordinates[0][1]],
        zoom: isMobile ? 14 : 16, // Smaller zoom on mobile
        antialias: true,
        interactive: true,
        touchZoomRotate: true // Better mobile touch support
      });

      mapRef.current = map;

      map.on("load", () => {
        try {
          // Add land polygon
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
              "line-width": isMobile ? 2 : 3 // Thinner lines on mobile
            }
          });

          addDistanceMarkers(map, coordinates);
          setIsLoading(false);
        } catch (layerError) {
          throw new Error(`Map rendering failed`);
        }
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
          width: isMobile ? "60px" : "70px", // Smaller on mobile
          padding: isMobile ? "2px" : "4px",
          fontSize: isMobile ? "10px" : "12px", // Smaller text on mobile
          borderRadius: "4px",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        });

        const marker = new mapboxgl.Marker({ 
          element: popup,
          anchor: 'center'
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
      {/* Responsive Map Container */}
      <div
        ref={mapContainer}
        className={`
          rounded-lg shadow-md
          h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] 
          w-full  // Full width on all devices
          relative overflow-hidden
        `}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="absolute inset-0 bg-red-50/90 flex items-center justify-center p-4">
            <div className="text-center max-w-xs">
              <p className="font-bold text-red-600 text-sm sm:text-base">Map Error</p>
              <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 px-3 py-1 bg-red-100 rounded text-xs sm:text-sm hover:bg-red-200 transition"
              >
                Reload Map
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Instructions */}
      {isMobile && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Pinch to zoom • Tap markers for details
        </p>
      )}
    </div>
  );
};

export default DisplayLand;