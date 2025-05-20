import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { RequestModel, RequestStutus } from "@/lib/models/land";
import { 
  getRequestWithContract,
  transerLandTitle
} from "@/lib/services/blockchainService/transfercontractServices";
import { acceptRequest, rejectRequest } from "@/lib/services/blockchainService/requestcontractServices";
import { SellerLayout } from "@/layout/SellerLayout";
import { CustomButton } from "@/components/common";
import { 
  FiArrowLeft, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiDollarSign,
  FiUser,
  FiMap,
  FiFileText,
  FiCalendar,
  FiCheck,
  FiX
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

declare var window: any;

const TransactionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [transaction, setTransaction] = useState<RequestModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        if (!id) return;

        setLoading(true);
        setError("");
        
        const requestId = parseInt(id as string);
        
        // Add validation for requestId
        if (isNaN(requestId)) {
          throw new Error("Invalid transaction ID");
        }

        // Get current block number first to avoid race conditions
        let blockNumber = null;
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          blockNumber = await provider.getBlockNumber();
          setCurrentBlock(blockNumber);
        }

        // Fetch transaction data with error handling
        const requestData = await getRequestWithContract(requestId).catch(err => {
          console.error("Contract call failed:", err);
          throw new Error("Failed to fetch transaction data from contract");
        });

        if (!requestData) {
          throw new Error("Transaction not found");
        }

        // Safely parse the response
        const parsedRequest: RequestModel = {
          requestId: requestData.requestId?.toString() || requestId.toString(),
          sellerId: requestData.sellerId || "Unknown",
          buyerId: requestData.buyerId || "Unknown",
          landId: requestData.landId?.toString() || "0",
          isPaymentDone: requestData.isPaymentDone ? "Completed" : "Pending",
          status: requestData.status || RequestStutus.Requested,
          blockNumber: blockNumber,
          postDate: new Date()
        };

        setTransaction(parsedRequest);
      } catch (err) {
        console.error("Error in fetchTransactionData:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [id]);

  const handleApprove = async () => {
    if (!transaction?.requestId) return;
    
    try {
      setActionLoading(true);
      setActionError("");
      
      // First accept the request
      const acceptResponse = await acceptRequest(parseInt(transaction.requestId));
      if (!acceptResponse?.status) {
        throw new Error(acceptResponse?.data || "Failed to accept request");
      }

      // Then transfer the land title if payment is done
      if (transaction.isPaymentDone === "Completed") {
        const transferResponse = await transerLandTitle(parseInt(transaction.requestId));
        if (!transferResponse?.status) {
          throw new Error(transferResponse?.data || "Failed to transfer land title");
        }
      }

      // Update status in UI
      setTransaction(prev => prev ? {
        ...prev,
        status: RequestStutus.Completed
      } : null);
    } catch (err) {
      console.error("Approval error:", err);
      setActionError(err instanceof Error ? err.message : "Failed to approve transaction");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!transaction?.requestId) return;
    
    try {
      setActionLoading(true);
      setActionError("");
      
      const response = await rejectRequest(parseInt(transaction.requestId));
      if (!response?.status) {
        throw new Error(response?.data || "Failed to reject request");
      }

      // Update status in UI
      setTransaction(prev => prev ? {
        ...prev,
        status: RequestStutus.Rejected
      } : null);
    } catch (err) {
      console.error("Rejection error:", err);
      setActionError(err instanceof Error ? err.message : "Failed to reject transaction");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusDetails = () => {
    if (!transaction) return { icon: null, color: "", text: "" };

    switch (transaction.status) {
      case RequestStutus.Completed:
        return {
          icon: <FiCheckCircle className="h-5 w-5" />,
          color: "text-green-500",
          text: "Completed"
        };
      case RequestStutus.Rejected:
        return {
          icon: <FiAlertCircle className="h-5 w-5" />,
          color: "text-red-500",
          text: "Rejected"
        };
      default:
        return {
          icon: <FiClock className="h-5 w-5" />,
          color: "text-yellow-500",
          text: transaction.isPaymentDone === "Completed" ? "Payment Completed" : "Pending Payment"
        };
    }
  };

  const getConfirmations = () => {
    console.log(" getConfirmations",transaction, " currentBlock",currentBlock);
    if (!transaction?.blockNumber || !currentBlock) return "N/A";
    return currentBlock - transaction.blockNumber;
  };

  const formatAddress = (address: string) => {
    if (!address) return "Unknown";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh] flex justify-center items-center">
          <div className="text-center">
            <p>Loading transaction details...</p>
          </div>
        </div>
      </SellerLayout>
    );
  }

  if (error) {
    return (
      <SellerLayout>
        <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh] flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <CustomButton
              title="Back to Transactions"
              styles="bg-[#4eac6f] text-white hover:bg-[#3d8a5a]"
              handleClick={() => router.push("/p_seller/PaymentCenter")}
              buttonType="button"
            />
          </div>
        </div>
      </SellerLayout>
    );
  }

  if (!transaction) {
    return (
      <SellerLayout>
        <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh] flex justify-center items-center">
          <div className="text-center">
            <p>Transaction not found</p>
            <CustomButton
              title="Back to Transactions"
              styles="bg-[#4eac6f] text-white hover:bg-[#3d8a5a] mt-4"
              handleClick={() => router.push("/p_seller/PaymentCenter")}
              buttonType="button"
            />
          </div>
        </div>
      </SellerLayout>
    );
  }

  const statusDetails = getStatusDetails();

  return (
    <SellerLayout>
      <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push("/p_seller/PaymentCenter")}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
              title="Go back to Payment Center"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="font-epilogue font-bold text-xl md:text-2xl text-[#4eac6f]">
              Transaction Details
            </h1>
          </div>

          {/* Transaction Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Status Bar */}
            <div className={`px-6 py-4 ${statusDetails.color} bg-opacity-10 flex items-center`}>
              {statusDetails.icon}
              <span className="ml-2 font-medium">{statusDetails.text}</span>
            </div>

            {/* Transaction Details */}
            <div className="p-6">
              {actionError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {actionError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Request ID</h3>
                    <p className="font-mono text-sm break-all">{transaction.requestId}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Land ID</h3>
                    <p className="font-medium">Land #{transaction.landId}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                    <p className="flex items-center">
                      <FiCalendar className="mr-2 h-4 w-4" />
                      {transaction.postDate ? formatDistanceToNow(transaction.postDate, { addSuffix: true }) : "N/A"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Payment Status</h3>
                    <p className={`flex items-center ${transaction.isPaymentDone === "Completed" ? 'text-green-500' : 'text-yellow-500'}`}>
                      {transaction.isPaymentDone === "Completed" ? (
                        <FiCheckCircle className="mr-2 h-4 w-4" />
                      ) : (
                        <FiClock className="mr-2 h-4 w-4" />
                      )}
                      {transaction.isPaymentDone}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Confirmations</h3>
                    <p>{getConfirmations()}</p>
                  </div>

                  {transaction.blockNumber && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Block Number</h3>
                      <p className="font-mono text-sm">{transaction.blockNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Parties Involved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    Buyer
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">Buyer</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatAddress(transaction.buyerId || "Unknown")}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    Seller (You)
                  </h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">Seller</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatAddress(transaction.sellerId || "Unknown")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Land Details */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                  <FiMap className="mr-2 h-4 w-4" />
                  Land Details
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">Land #{transaction.landId}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Land details not specified
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
              <CustomButton
                title="Back to Transactions"
                styles="border border-gray-300 hover:bg-gray-100"
                handleClick={() => router.push("/p_seller/PaymentCenter")}
                buttonType="button"
                disabled={actionLoading}
              />
              
              {transaction.status === RequestStutus.Requested && (
                <>
                  <CustomButton
                    title={actionLoading ? "Processing..." : "Reject"}
                    styles="bg-red-500 text-white hover:bg-red-600 flex items-center"
                    handleClick={handleReject}
                    buttonType="button"
                    disabled={actionLoading}
                    icon={<FiX className="mr-2" />}
                  />
                  <CustomButton
                    title={actionLoading ? "Processing..." : "Approve"}
                    styles="bg-[#4eac6f] text-white hover:bg-[#3d8a5a] flex items-center"
                    handleClick={handleApprove}
                    buttonType="button"
                    disabled={actionLoading || transaction.isPaymentDone !== "Completed"}
                    icon={<FiCheck className="mr-2" />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default TransactionDetail;