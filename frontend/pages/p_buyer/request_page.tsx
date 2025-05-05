import BuyerLayout from "@/layout/BuyerLayout";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Breakpoint } from "antd/es/_util/responsiveObserver";
import { getSentRequestsidList } from "@/lib/services/blockchainService/requestcontractServices";
import { RequestModel, RequestStutus } from "@/lib/models/land";
import { Loader } from "@/components/common";
import { makePaymentUsingWallet } from "@/lib/services/blockchainService/paymentcontractServices";

const Request_page = () => {
  const [sentRequests, setSentRequests] = useState<RequestModel[]>([]);
  const [isOnPayment, setIsOnPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<string>("");

  useEffect(() => {
    const getSentRequests = async () => {
      const sentRequestss = await getSentRequestsidList();
      if (sentRequestss) {
        setSentRequests(sentRequestss);
      }
    };
    getSentRequests();
  }, []);

  const handlePayment = async (id: number, userAddress: string) => {
    setIsOnPayment(true);
    const response = await makePaymentUsingWallet(id, userAddress);
    if (response?.status) {
      setPaymentMessage("✅ Successfully Paid!");
      // Update the specific request to reflect payment status
      setSentRequests((prevRequests) =>
        prevRequests.map((request) =>
          Number(request.requestId) === id
            ? { 
                ...request, 
                isPaymentDone: "Completed", 
                status: RequestStutus.PAID 
              }
            : request
        )
      );
    }
    setIsOnPayment(false);
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      responsive: ["xs", "sm", "md", "lg"] as Breakpoint[],
    },
    {
      title: "Seller ID",
      dataIndex: "sellerId",
      responsive: ["sm", "md", "lg"] as Breakpoint[],
    },
    {
      title: "Buyer ID",
      dataIndex: "buyerId",
      key: "buyerId",
      responsive: ["sm", "md", "lg"] as Breakpoint[],
    },
    {
      title: "Payment Status",
      dataIndex: "isPaymentDone",
      key: "isPaymentDone",
      responsive: ["md", "lg"] as Breakpoint[],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["md", "lg"],
    },
    {
      title: "",
      key: "payment",
      render: (text: any, record: RequestModel) => (
        <div className="w-full flex justify-end">
          <button
            disabled={record.isPaymentDone === "Completed" || record.status !== RequestStutus.Accepted}
            className={`text-xs sm:text-sm md:text-base px-3 py-2 rounded-md transition-all duration-300 ${
              record.isPaymentDone === "Completed" || record.status !== RequestStutus.Accepted
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            onClick={() => record.sellerId && handlePayment(Number(record.requestId), record.sellerId)}
          >
            {record.isPaymentDone === "Completed" ? "Payment Completed" : "Make Payment"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <BuyerLayout>
      <div className="w-full min-h-screen px-2 sm:px-4 md:px-8 py-4 bg-gray-50">
        {/* Payment Message */}
        {paymentMessage && (
          <div className="w-full text-center mb-4">
            <span className="text-green-600 font-semibold text-sm sm:text-base">
              {paymentMessage}
            </span>
          </div>
        )}

        {/* Loader */}
        {isOnPayment ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="overflow-x-auto bg-white p-4 rounded-lg ">
            <Table
              dataSource={sentRequests}
              columns={columns}
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
              className="min-w-full"
            />
          </div>
        )}
      </div>
    </BuyerLayout>
  );
};

export default Request_page;