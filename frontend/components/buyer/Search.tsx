import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { getAllAvaliableLands } from "@/lib/appstate/features/land/actions";
import { LandModel } from "@/lib/models/land";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const { avaliableLands } = useAppSelector(LandSelector);
  const initialLands = useRef<LandModel[]>([]);

  // Store the original lands on first render
  useEffect(() => {
    if (avaliableLands?.length && !initialLands.current.length) {
      initialLands.current = [...avaliableLands];
    }
  }, [avaliableLands]);

  // Debounced search handler with a 300ms delay
  const handleSearchChange = debounce((value: string) => {
    filterLands(value);
  }, 300);

  const filterLands = (searchValue: string) => {
    if (!searchValue.trim()) {
      // If search is empty, restore original lands
      dispatch(getAllAvaliableLands(initialLands.current));
      return;
    }

    const filteredLands = initialLands.current.filter((land) => {
      const title = land.title?.toLowerCase() || '';
      const detail = land.detail?.toLowerCase() || '';
      const location = land.locationAddress?.toLowerCase() || '';
      const price = land.price?.toString().toLowerCase() || '';
      const area = land.area?.toString().toLowerCase() || '';
      const lowercasedSearchValue = searchValue.toLowerCase();

      return (
        title.includes(lowercasedSearchValue) ||
        detail.includes(lowercasedSearchValue) ||
        location.includes(lowercasedSearchValue) ||
        price.includes(lowercasedSearchValue) ||
        area.includes(lowercasedSearchValue)
      );
    });

    // Update the filtered lands state using Redux
    // Update the filtered lands state using Redux
    dispatch(getAllAvaliableLands(filteredLands));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearchChange(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    dispatch(getAllAvaliableLands(initialLands.current)); // Reset the lands when clearing the search
  };

  useEffect(() => {
    return () => {
      handleSearchChange.cancel(); // Clean up the debounced function on unmount
    };
  }, []);

  return (
    <div className="relative">
      <div className="lg:flex-1 flex flex-row w-full py-2 pl-4 pr-2 h-[52px] border-2 rounded-[100px] w-[540px]">
        <input
          onChange={handleInputChange}
          value={searchValue}
          type="text"
          placeholder="Search for Lands"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-black bg-transparent outline-none"
        />

        {searchValue ? (
          <button 
            onClick={handleClearSearch}
            className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
          >
            <span className="text-white">X</span>
          </button>
        ) : (
          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img
              src="/Icons/search.svg"
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
