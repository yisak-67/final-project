import SellerLayout from "@/layout/SellerLayout";
import React, { useState, useEffect } from "react";
import { Collapse, Divider } from "antd";
import { RequestModel } from "@/lib/models/land";
import {
  acceptRequest,
  getRecievedRequestsidList,
  rejectRequest,
} from "@/lib/services/blockchainService/requestcontractServices";
import { CustomButton } from "@/components/common";
import { useRouter } from "next/router";

const { Panel } = Collapse;

const Manage_request = () => {
  const [recievedRequests, setRecievedRequest] = useState<RequestModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("working...");
    const getRecievedRequests = async () => {
      const recievedList = await getRecievedRequestsidList();
      if (recievedList) {
        console.log("working...");

        setRecievedRequest(recievedList);
      }
    };
    getRecievedRequests();
  }, []);

  const handleAcceptRequest = async (reqId: number) => {
    const response = await acceptRequest(reqId);
    router.push("/p_seller/ManageRequest");
    console.log(response);
  };
  const handleRejectRequest = async (reqId: number) => {
    const response = await rejectRequest(reqId);
    console.log(response);
  };

  return (
    <SellerLayout>
      <div className="ml-[270px] h-[93vh] ">
        <h1 className="font-epilogue font-bold sm:text-[18px] text-[12x] text-[#4eac6f] leading-[30px] ml-4 w-full">
          Recieved Requests
        </h1>
        {recievedRequests.length > 0 ? (
          <div className="flex  flex-col items-center justify-center">
            {recievedRequests.map((req, index) => (
              <div key={index} className="w-[75vw]  mt-5">
                <Collapse>
                  <Panel
                    className="w-[75vw]"
                    header={`Request from user ${req.buyerId}`}
                    key="1"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="font-sarf font-semibold ">
                        Payment :{" "}
                        {req.isPaymentDone === "true"
                          ? "Done"
                          : "Not Completed"}
                      </div>
                      <div className="flex flex-row justify-around w-[200px]">
                        {req.status === "Accepted" ? (
                          <p>Already accepted this request!</p>
                        ) : (
                          <>
                            <p>{req.id}</p>
                            <CustomButton
                              styles="border border-green-500 text-green-500 rounded-md  px-2 transition duration-300 hover:bg-green-500 hover:text-white"
                              title={"Accept"}
                              handleClick={() =>
                                handleAcceptRequest(req.id as number)
                              }
                              buttonType={""}
                            />
                            <CustomButton
                              styles="border border-red-500 text-red-500 rounded-md  px-2 transition duration-300 hover:bg-red-500 hover:text-white"
                              title={"Reject"}
                              handleClick={() =>
                                handleRejectRequest(req.id as number)
                              }
                              buttonType={""}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="font-mon font-extrabold">
              You dont have any request yet!
            </p>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default Manage_request;
