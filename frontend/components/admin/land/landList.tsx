// components/LandsList.tsx
import React, { useState } from "react";
import LandCard from "./landCard";
import Pagination from "react-js-pagination";
import { LandModel } from "@/lib/models/land";
type LandsListProps = {
  lands: LandModel[];
};

const LandsList: React.FC<LandsListProps> = ({ lands }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsCountPerPage = 5; // Set how many items per page you want

  const indexOfLastItem = activePage * itemsCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;

  const filteredLands = lands.filter(
    (land) =>
      land.postedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      land.locationAddress?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <input
          className="border-2 border-gray-300 md:w-1/2 bg-white h-16 px-5 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search by owner or location"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div>
        {filteredLands.length ? (
          filteredLands.map((land) => <LandCard key={land.id} land={land} />)
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-200 p-8 rounded-lg">
              <p className="text-center text-xl">Empty Search results.</p>
            </div>
          </div>
        )}
      </div>
      {filteredLands.length > 5 && (
        <div className="mt-4 flex justify-center items-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={filteredLands.length}
            pageRangeDisplayed={2}
            onChange={handlePageChange}
            itemClass="page-item inline-block px-3 py-1 mx-1 rounded-md bg-blue-200 hover:bg-blue-300"
            linkClass="page-link"
            activeLinkClass="text-white bg-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default LandsList;
