import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { getAllAvaliableLands } from "@/lib/appstate/features/land/actions";
import { LandModel } from "@/lib/models/land";

const Filter = () => {
  const dispatch = useAppDispatch();
  const { avaliableLands } = useAppSelector(LandSelector);

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    const filteredLands = avaliableLands?.filter((land) => {
      const landPrice = parseFloat(land.price!);
      return landPrice <= sliderValue;
    });

    dispatch(getAllAvaliableLands(filteredLands as LandModel[]));
    
  };

  const [landSliderValue, setLandSliderValue] = useState(0);

  const handleLandSliderChange = (value: any) => {
    setLandSliderValue(value);
    const filteredLands = avaliableLands?.filter((land) => {
      const landArea = parseFloat(land.area!);
      return landArea <= sliderValue;
    });

    dispatch(getAllAvaliableLands(filteredLands as LandModel[]));
  };

  const [datefilterOption, setDateFilterOption] = useState("");
  const handleFilterOptionChange = (event: any) => {
    setDateFilterOption(event.target.value);

    const filteredLands = avaliableLands?.filter((land) => {
      if (datefilterOption === "today") {
        const postedDate = new Date(land.postedDate!);
        const today = new Date();
        return isSameDate(postedDate, today);
      }

      if (datefilterOption === "yesterday") {
        const postedDate = new Date(land.postedDate!);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return isSameDate(postedDate, yesterday);
      }

      if (datefilterOption === "lastMonth") {
        const postedDate = new Date(land.postedDate!);
        const currentDate = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return postedDate >= lastMonth && postedDate < currentDate;
      }
      return true;
    });

    dispatch(getAllAvaliableLands(filteredLands as LandModel[]));
  };

  const isSameDate = (date1: any, date2: any) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-transparent rounded-lg shadow-lg p-6 w-[350px] h-[83vh] border-2 ">
      <h2 className="text-lg font-medium mb-4">Filters</h2>
      <div className="flex flex-col justify-between  gap-[50px]">
        {/* Price Range filter */}

        <div className="">
          <label className="block text-gray-700 font-medium mb-2">
            Price Range:
          </label>
          <div className="flex items-center flex-col">
            <div className="w-[300px] pr-4 ml-5">
              <Slider
                value={sliderValue}
                min={0}
                max={100000}
                defaultValue={[0, 100000]}
                onChange={handleSliderChange}
                trackStyle={[{ backgroundColor: "#48BB78" }]}
                step={1}
                activeDotStyle={{ borderColor: "#4F46E5" }}
                handleStyle={[
                  {
                    backgroundColor: "#48BB78",
                    border: "none",
                    boxShadow: "none",
                    marginTop: "-5px",
                  },
                  {
                    backgroundColor: "#48BB78",
                    border: "none",
                    boxShadow: "none",
                    marginTop: "-5px",
                  },
                ]}
                railStyle={{
                  backgroundColor: "#E5E7EB",
                  height: "5px",
                  borderRadius: "5px",
                }}
              />{" "}
            </div>
            <div className="flex justify-between mt-2 flex-row">
              <span className="text-gray-600 font-thin">{sliderValue} - </span>
              <span className="text-gray-600 font-thin">1000000 Matic</span>
            </div>
          </div>
        </div>

        {/* Posted date filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Posted date:
          </label>
          <div className="flex  flex-col justify-start px-2  mt-1 ">
            <label className="">
              <input
                type="checkbox"
                value="all"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                checked={datefilterOption === "all"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2  text-gray-700">All</span>
            </label>
            <label className="">
              <input
                type="checkbox"
                value="today"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                checked={datefilterOption === "today"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2  text-gray-700">Today</span>
            </label>

            <label className="">
              <input
                type="checkbox"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                value="yesterday"
                checked={datefilterOption === "yesterday"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2 text-gray-700">Yesterday</span>
            </label>

            <label className="">
              <input
                type="checkbox"
                value="lastmonth"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                checked={datefilterOption === "lastmonth"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2 text-gray-700">Last month</span>
            </label>
          </div>
        </div>

        {/* Land area filter */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Land area:
          </label>
          <div className="flex items-center flex-col">
            <div className="w-[300px] pr-4 ml-5">
              <Slider
                value={landSliderValue}
                min={0}
                max={100000}
                defaultValue={[0, 100000]}
                onChange={handleLandSliderChange}
                trackStyle={[{ backgroundColor: "#48BB78" }]}
                handleStyle={[
                  {
                    backgroundColor: "#48BB78",
                    border: "none",
                    boxShadow: "none",
                    marginTop: "-5px",
                  },
                  {
                    backgroundColor: "#48BB78",
                    border: "none",
                    boxShadow: "none",
                    marginTop: "-5px",
                  },
                ]}
                railStyle={{
                  backgroundColor: "#E5E7EB",
                  height: "5px",
                  borderRadius: "5px",
                }}
              />{" "}
            </div>
            <div className="flex justify-between mt-2 flex-row">
              <span className="text-gray-600 font-thin">
                {landSliderValue}-{" "}
              </span>
              <span className="text-gray-600 font-thin">100000 sqft.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
