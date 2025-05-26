import React, { useState, useEffect } from "react";
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
  const [landSliderValue, setLandSliderValue] = useState(0);
  const [datefilterOption, setDateFilterOption] = useState("");
  
  const [allLands, setAllLands] = useState<LandModel[]>([]);
  const [filteredLands, setFilteredLands] = useState<LandModel[]>([]);

  useEffect(() => {
    if (avaliableLands && avaliableLands.length) {
      setAllLands(avaliableLands);
      setFilteredLands(avaliableLands);
    }
  }, [avaliableLands]);

  const isSameDate = (date1: any, date2: any) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const applyFilters = (priceLimit: number, areaLimit: number, dateOption: string) => {
    let updatedLands = [...allLands];

    if (priceLimit) {
      updatedLands = updatedLands.filter((land) => parseFloat(land.price!) <= priceLimit);
    }

    if (areaLimit) {
      updatedLands = updatedLands.filter((land) => parseFloat(land.area!) <= areaLimit);
    }

    if (dateOption && dateOption !== "all") {
      updatedLands = updatedLands.filter((land) => {
        const postedDate = new Date(land.postedDate!);
        const today = new Date();
        if (dateOption === "today") {
          return isSameDate(postedDate, today);
        } else if (dateOption === "yesterday") {
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          return isSameDate(postedDate, yesterday);
        } else if (dateOption === "lastmonth") {
          const lastMonth = new Date();
          lastMonth.setMonth(today.getMonth() - 1);
          return postedDate >= lastMonth && postedDate <= today;
        }
        return true;
      });
    }

    setFilteredLands(updatedLands);
    dispatch(getAllAvaliableLands(updatedLands as LandModel[]));
  };

  const handleSliderChange = (value: any) => {
    setSliderValue(value);
    applyFilters(value, landSliderValue, datefilterOption);
  };

  const handleLandSliderChange = (value: any) => {
    setLandSliderValue(value);
    applyFilters(sliderValue, value, datefilterOption);
  };

  const handleFilterOptionChange = (event: any) => {
    const value = event.target.value;
    setDateFilterOption(value);
    applyFilters(sliderValue, landSliderValue, value);
  };

  return (
    <div className="bg-gradient-to-b from-white to-transparent rounded-lg shadow-lg p-6 w-[350px] h-[83vh] border-2 ">
      <h2 className="text-lg font-medium mb-4">Filters</h2>
      <div className="flex flex-col justify-between gap-[50px]">
        {/* Price Range filter */}
        <div className="">
          <label className="block text-gray-700 font-medium mb-2">Price Range:</label>
          <div className="flex items-center flex-col">
            <div className="w-[300px] pr-4 ml-5">
              <Slider
                value={sliderValue}
                min={0}
                max={10000000000}
                defaultValue={[0, 100000000]}
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
              />
            </div>
            <div className="flex justify-between mt-2 flex-row">
              <span className="text-gray-600 font-thin">{sliderValue} - </span>
              <span className="text-gray-600 font-thin">1000000000 Matic</span>
            </div>
          </div>
        </div>

        {/* Posted date filter */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Posted date:</label>
          <div className="flex flex-col justify-start px-2 mt-1">
            <label className="">
              <input
                type="checkbox"
                value="all"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                checked={datefilterOption === "all"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2 text-gray-700">All</span>
            </label>
            <label className="">
              <input
                type="checkbox"
                value="today"
                className="form-checkbox rounded-full h-5 w-5 text-indigo-600"
                checked={datefilterOption === "today"}
                onChange={handleFilterOptionChange}
              />
              <span className="ml-2 text-gray-700">Today</span>
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
          <label className="block text-gray-700 font-medium mb-2">Land area:</label>
          <div className="flex items-center flex-col">
            <div className="w-[300px] pr-4 ml-5">
              <Slider
                value={landSliderValue}
                min={0}
                max={10000000}
                defaultValue={[0, 10000000]}
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
              />
            </div>
            <div className="flex justify-between mt-2 flex-row">
              <span className="text-gray-600 font-thin">
                {landSliderValue}-{" "}
              </span>
              <span className="text-gray-600 font-thin">1000000 sqft.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;