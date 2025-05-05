import Layout from "@/components/admin/layout";
import { LandModel, RequestModel, parseLandData } from "@/lib/models/land";
import {
  getAllRequestsListWithContract,
  transerLandTitle,
} from "@/lib/services/blockchainService/transfercontractServices";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "antd";
import { Table } from "antd";
import { Loader } from "@/components/common";
import { getLandWithContract } from "@/lib/services/blockchainService/landcontractServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TransferModel: React.FC<{
  landId: number;
  requestModel: RequestModel;
}> = ({ landId, requestModel }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [land, setLand] = useState<LandModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleTranserOwnership = async (id: number) => {
    console.log("working on tr");
    setIsLoading(true);
    var response = await transerLandTitle(id);
    
    if (response?.status) {
      setOpen(false);
      toast.success("Transfer Ownership success");
    }
    setIsLoading(false);
  };

  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    const getLand = async () => {
      const currentLand = await getLandWithContract(landId);
      if (currentLand) {
        let landTemp = Object.assign({}, currentLand);
        console.log("land temp");
        console.log(landTemp);
        setLand(parseLandData(landTemp));
      }
    };
    getLand();
  }, [landId]);

  useEffect(() => {
    if (open) {
      const iframe = document.createElement("iframe");
      iframe.src = "/pdf/transferTemplate.pdf";
      iframe.width = "100%";
      iframe.height = "600px";
      iframe.style.border = "none";

      const pdfContainer = document.getElementById("pdfContainer");
      if (pdfContainer) {
        pdfContainer.innerHTML = ""; // Clear previous content
        pdfContainer.appendChild(iframe);
      }
    }
  }, [open]);

  return (
    <>
      <Button type="default" onClick={showModal}>
        Transfer Ownership
      </Button>
      <Modal
        className="p-10 text-gray-500"
        width={1000}
        title="Transfer Land Ownership"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex flex-row">
          <div className="w-[450px] mt-10">
            <h2>Users Info</h2>
            <div className="flex flex-wrap flex-col justify-center items-center gap-3 mt-5">
              {/* Current Owner Section */}
              <div className="w-[400px] bg-gradient-to-b from-white to-transparent rounded-lg shadow-lg border-1 flex flex-col">
                <div className="flex flex-row py-1 items-center justify-between mt-2 px-2">
                  <div className="flex flex-row">
                    <img src="/Icons/profile.svg" alt="Owner" />
                    <div className="flex flex-col mx-2 px-2">
                      <h3 className="font-thin font-serif text-gray text-[11px]">
                        Current Owner
                      </h3>
                      {/* Changed to show land owner's name instead of requestModel.sellerName */}
                      <h1 className="font-semibold text-justify text-[13px] font-sans">
                        {requestModel.sellerId|| "Unknown Owner"}
                      </h1>
                    </div>
                  </div>
                  <div className="text-[#4eac6f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Buyer Section */}
              <div className="w-[400px] bg-gradient-to-b from-white to-transparent rounded-lg shadow-lg border-1 flex flex-col">
                <div className="flex flex-row py-1 items-center justify-between mt-2 px-2">
                  <div className="flex flex-row">
                    <img src="/Icons/profile.svg" alt="Buyer" />
                    <div className="flex flex-col mx-2 px-2">
                      <h3 className="font-thin font-serif text-gray text-[11px]">
                        New Owner (Buyer)
                      </h3>
                      <h1 className="font-semibold text-justify text-[13px] font-sans">
                        {requestModel.buyerId || "Unknown Buyer"}
                      </h1>
                    </div>
                  </div>
                  <div className="text-[#4eac6f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h2>Land Info</h2>
              <div className="w-[400px] border-1 flex flex-col">
                <div className="flex flex-col justify-between p-10 gap-2">
                  <p className="text-justify w-[300px]">{land?.title}</p>
                  <div className="">
                    <img
                      src={`${
                        land?.documentHash ?? "/images/placeholderImage.jpg"
                      }`}
                      alt={land?.title || "Land image"}
                      className=""
                      width={300}
                      height={300}
                    />
                  </div>
                  <p className="text-justify w-[300px]">
                    Area : {land?.area} m2
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-mono font-semibold sm:text-[18px] text-[10x] text-[#4eac6f] leading-[24px] ml-4 mt-5 py-2">
              Transfership Document - Agreement
            </p>
            <div id="pdfContainer" className="w-[400px]"></div>
            <button
              onClick={() =>
                handleTranserOwnership(
                  Number.parseInt(requestModel.requestId || "")
                )
              }
              className="bg-[#4acd8d] text-white p-2 w-96 rounded-lg shadow-lg flex justify-center items-center hover:cursor-pointer mt-10"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Transfer Ownership"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const TransferOwnerShip = () => {
  const [allRequests, setAllRequests] = useState<RequestModel[]>([]);
  const [paymentDoneRequests, setPaymentDoneRequests] = useState<RequestModel[]>([]);
  const [IsOnTransfer, setIsOnTransfer] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");

  useEffect(() => {
    const getAllRequest = async () => {
      const requestList = await getAllRequestsListWithContract();
      if (requestList) {
        console.log("working...");
        const filteredRequests = requestList.filter(
          (request) => request.isPaymentDone === "Completed"
        );
        setAllRequests(filteredRequests);
      }
    };
    getAllRequest();
  }, []);

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
        <TransferModel landId={Number(record.landId)} requestModel={record} />
      ),
    },
  ];

  return (
    <Layout>
      {transferMessage}
      {IsOnTransfer ? <Loader /> : <div></div>}
      <div className="md:ml-[270px]">
        <div>
          <p className="font-mono font-semibold sm:text-[18px] text-[10x] text-[#4eac6f] leading-[24px] ml-4 mt-5 py-2">
            Available Transfers - Payment Done List
          </p>
        </div>
        <div className="w-full px-1 py-1 m-2 h-auto">
          <Table dataSource={allRequests} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default TransferOwnerShip;