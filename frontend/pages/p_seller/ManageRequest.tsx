import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { useRouter } from "next/router";
import SellerLayout from "@/layout/SellerLayout";
import { CustomButton } from "@/components/common";
import { RequestModel } from "@/lib/models/land";
import {
  getRecievedRequestsidList,
  acceptRequest,
  rejectRequest,
} from "@/lib/services/blockchainService/requestcontractServices";

const { Panel } = Collapse;

const ManageRequest = () => {
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await getRecievedRequestsidList();
      console.log("Raw Data:", data);

      if (data && Array.isArray(data)) {
        const normalized = data.map((req: any) => ({
          ...req,
          id: req.requestId ?? req.id, // fallback if already correct
        }));
        setRequests(normalized);
      }
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId: number) => {
    try {
      await acceptRequest(requestId);
      router.push("/p_seller/ManageRequest");
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await rejectRequest(requestId);
      fetchRequests();
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  return (
    <SellerLayout>
      <div className="ml-0 lg:ml-[270px] px-4 py-6 min-h-[93vh] max-w-screen-xl mx-auto">
        <h1 className="font-bold text-xl md:text-2xl text-[#4eac6f] mb-6">
          Received Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading requests...</p>
          </div>
        ) : requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((req, idx) => (
              <Collapse
                key={idx}
                bordered={false}
                className="bg-white rounded-lg shadow-sm"
              >
                <Panel
                  key={req.id ?? `fallback-${idx}`}
                  header={
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="font-medium">
                        Request from user {req.buyerId || "Unknown"}
                      </span>
                      {req.status === "Accepted" && (
                        <span className="text-green-500 text-sm">Accepted</span>
                      )}
                    </div>
                  }
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-2">
                    <div className="space-y-2 text-sm sm:text-base">
                      <p className="text-gray-700">
                        <span className="font-semibold">Payment Status:</span>{" "}
                        <span
                          className={
                            req.isPaymentDone === "Completed"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {req.isPaymentDone === "Completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Request ID:</span>{" "}
                        {req.id ?? "N/A"}
                      </p>
                    </div>

                    {req.status === "Accepted" ? (
                      <span className="text-green-500 font-medium text-sm sm:text-base">
                        Request already accepted
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                        <CustomButton
                          styles="w-full sm:w-24 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-1 px-3 rounded"
                          title="Accept"
                          handleClick={() => handleAccept(req.id as number)}
                          buttonType="button"
                        />
                        <CustomButton
                          styles="w-full sm:w-24 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-1 px-3 rounded"
                          title="Reject"
                          handleClick={() => handleReject(req.id as number)}
                          buttonType="button"
                        />
                      </div>
                    )}
                  </div>
                </Panel>
              </Collapse>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <p className="text-gray-600 text-lg mb-4">
              You don't have any requests yet!
            </p>
            <CustomButton
              styles="bg-[#4eac6f] text-white hover:bg-[#3d8a5a] py-2 px-4 rounded"
              title="Check Again"
              handleClick={fetchRequests}
              buttonType="button"
            />
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default ManageRequest;
