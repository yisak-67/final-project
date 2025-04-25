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
    var coordinates = locatLandwithMapBox();

    dispatch(setLocationAddress(JSON.stringify(coordinates.allLatlong)));
    dispatch(setLandArea(coordinates.lArea));
    console.log("finishing");
    console.log("cordinate",coordinates);
    dispatch(setShowMapbox(false));
  };

  useEffect(() => {
    locatLandwithMapBox();
  }, []);

  return (
    <div className="w-[1000px] h-full scroll-my-1 bg-[#082232] fixed right-0 top-0 p-6  z-[1000] text-white rounded-l-[25px]  transition ease-in-out">
      <button
        type="button"
        title="Close map"
        className="mt-1 "
        onClick={() => dispatch(setShowMapbox(false))}
      >
        <AiOutlineLeft size={30} />
      </button>
      <div
        className="w-full h-[500px] rounded-[15px] ml-[15px] mt-10"
        id="Map1"
      />
      <div>Land Area {landArea} m2</div>
      <div className="flex items justify-center mt-10">
        <button
          onClick={handleFinishDrawing}
          className="px-4 py-2 text-white bg-[#4eac6f] rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500"
        >
          finish drawing
        </button>
      </div>
    </div>
  );
};

export default LocateMap;
