import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { getAllAvaliableLands } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { LandModel } from "@/lib/models/land";
import React, { useState } from "react";

const Search = () => {
  const [searchValue, setsearchValue] = useState("");

  const dispatch = useAppDispatch();
  const { avaliableLands } = useAppSelector(LandSelector);

  const handleSearchChange = (e: any) => {
    setsearchValue(e.target.value);
    const filteredLands = avaliableLands?.filter((land) => {
      const title = land.title!.toLowerCase();
      const detail = land.detail!.toLowerCase();

      return (
        title.includes(searchValue.toLowerCase()) ||
        detail.includes(searchValue.toLowerCase())
      );
    });

    dispatch(getAllAvaliableLands(filteredLands as LandModel[]));
  };

  return (
    <div>
      <div className="lg:flex-1 flex flex-row  w-full py-2 pl-4 pr-2 h-[52px] border-2 rounded-[100px] w-[540px]">
        <input
          onChange={handleSearchChange}
          value={searchValue}
          type="text"
          placeholder="Search for Lands"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src="/Icons/search.svg"
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
