import Filter from "@/components/buyer/Filter";
import LandCard from "@/components/buyer/LandCard";
import Search from "@/components/buyer/Search";
import Sort from "@/components/buyer/Sort";
import Navbar from "@/components/common/navbar";
import BuyerLayout from "@/layout/BuyerLayout";
import { useAppDispatch, useAppSelector } from "@/lib/appstate";
import { getAllAvaliableLands } from "@/lib/appstate/features/land/actions";
import { LandSelector } from "@/lib/appstate/features/land/selectors";
import { LandModel } from "@/lib/models/land";
import { getAllLandsListWithContract } from "@/lib/services/blockchainService/landcontractServices";
import React, { useEffect } from "react";
import { Spin } from "antd";

const Buyer_page = () => {
  const dispatch = useAppDispatch();
  const { avaliableLands } = useAppSelector(LandSelector);

  useEffect(() => {
    const getAvaliableLands = async () => {
      const lands = await getAllLandsListWithContract();
      dispatch(getAllAvaliableLands(lands));
    };
    getAvaliableLands();
  }, []);

  return (
    <BuyerLayout>
      <div className="p-1 m-1 flex flex-row gap-3" key={"asdf"}>
        <div>
          <Filter />
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-start items-center  ml-5  ">
            <Search />
          </div>
          <div className="mx-2">
            <p className="font-mono font-semibold sm:text-[18px] text-[10x] text-[#4eac6f] leading-[24px] ml-4 mt-5 py-2">
              Avaliable Lands
            </p>
            <div className="h-auto border-2 rounded-[15px] mx-4 mt-2 p-4">
              {avaliableLands ? (
                <>
                  {avaliableLands.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {avaliableLands.map((land: LandModel, i: number) => (
                        <>
                          <LandCard index={i} key={i} landItem={land} />
                        </>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p>No Lands yet!</p>
                    </>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-2 flex-wrap items-center justify-center py-3 mt-2">
                  <Spin size="large" />
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default Buyer_page;
