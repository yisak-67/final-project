import BuyerLayout from "@/layout/BuyerLayout";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getSentRequestsidList } from "@/lib/services/blockchainService/requestcontractServices";
import { RequestModel, RequestStutus } from "@/lib/models/land";
import { CustomButton, Loader } from "@/components/common";
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
    var response = await makePaymentUsingWallet(id, userAddress);
    if (response?.status) {
      setPaymentMessage("Sucessfully Paid!");
    }
    setIsOnPayment(false);
  };

  const columns = [
    {
      title: "Request Id",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Seller ID",
      dataIndex: "sellerId",
      key: "sellerId",
    },
    {
      title: "Buyer ID",
      dataIndex: "buyerId",
      key: "buyerId",
    },
    {
      title: "Payment Status",
      dataIndex: "isPaymentDone",
      key: "isPaymentDone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "",
      Key: "payment",
      render: (text: any, record: any) => (
        <div className="w-full h-10 flex justify-end ">
          <button
            disabled={record.status === RequestStutus.Requested ? true : false}
            className={` text-white rounded-md p-2 ${
              record.status === RequestStutus.Requested
                ? "bg-gray-200"
                : "bg-[#4eac6f]"
            }`}
            onClick={() =>
              handlePayment(Number(record.requestId), record.sellerId)
            }
          >
            Make payment
          </button>
        </div>
      ),
    },
  ];

  return (
    <BuyerLayout>
      {paymentMessage}
      {isOnPayment ? <Loader /> : <div></div>}
      <div className="w-full px-1 py-1 m-2  h-auto">
        <Table dataSource={sentRequests} columns={columns} />
      </div>
    </BuyerLayout>
  );
};

export default Request_page;
