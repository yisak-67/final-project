import React, { useEffect, useState } from "react";
import { locatLandwithMapBox } from "@/lib/services/mapbox/locatLandService";
import { LandCoordinates } from "@/lib/models/land";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import {
  setLandArea,
  setLocationAddress,
  setShowMapbox,
} from "@/lib/appstate/features/land/actions";
import { AiOutlineLeft } from "react-icons/ai";
import "mapbox-gl/dist/mapbox-gl.css";
import { LandSelector } from "@/lib/appstate/features/land/selectors";

const LocateMap = () => {
  const dispatch = useAppDispatch();
  const { landArea } = useAppSelector(LandSelector);

  const handleFinishDrawing = () => {
    const coordinates = locatLandwithMapBox();
    dispatch(setLocationAddress(JSON.stringify(coordinates.allLatlong)));
    dispatch(setLandArea(coordinates.lArea));
    dispatch(setShowMapbox(false));
  };

  useEffect(() => {
    locatLandwithMapBox();
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#082232] bg-opacity-90 flex flex-col p-4 sm:p-6 md:p-8 transition-all duration-300">
      {/* Header/Controls */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          type="button"
          title="Close map"
          onClick={() => dispatch(setShowMapbox(false))}
          className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition"
        >
          <AiOutlineLeft size={24} className="sm:w-6 sm:h-6" />
        </button>
        
        <div className="text-white text-lg sm:text-xl font-medium">
          Land Area: {landArea || 0} m²
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 rounded-lg overflow-hidden shadow-xl">
        <div 
          className="w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          id="Map1"
        />
      </div>

      {/* Footer/Button */}
      <div className="mt-4 sm:mt-6 flex justify-center">
        <button
          onClick={handleFinishDrawing}
          className="px-6 py-3 sm:px-8 sm:py-3 text-white bg-[#4eac6f] rounded-lg hover:bg-[#3e8c5f] focus:outline-none focus:ring-2 focus:ring-[#4eac6f] focus:ring-opacity-50 transition-colors duration-200 font-medium text-base sm:text-lg"
        >
          Finish Drawing
        </button>
      </div>
    </div>
  );
};

export default LocateMap;