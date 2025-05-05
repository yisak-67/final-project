import SellerLayout from "@/layout/SellerLayout";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { CustomButton } from "@/components/common";

declare var window: any;

const Payment_center = () => {
  const [balance, setBalance] = useState<string>("Loading...");
  const [userAddress, setUserAddress] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask not detected");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setUserAddress(address);
        
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
        setIsLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <SellerLayout>
      <div className="ml-0 lg:ml-[270px] p-4 min-h-[93vh]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="font-epilogue font-bold text-xl md:text-2xl text-[#4eac6f]">
            Payment Center
          </h1>
          {error && (
            <p className="text-red-500 text-sm mt-2 md:mt-0">{error}</p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading account data...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full max-w-4xl mx-auto">
            {/* Account Info Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-full md:w-auto">
                <p className="text-gray-600 text-sm">Account</p>
                <p className="text-gray-800 font-mono text-sm md:text-base break-all">
                  {formatAddress(userAddress)}
                </p>
              </div>
              <div className="w-full md:w-auto">
                <p className="text-gray-600 text-sm">Balance</p>
                <p className="text-[#4eac6f] font-bold text-lg">
                  {parseFloat(balance).toFixed(4)} ETH
                </p>
              </div>
            </div>

            {/* Recent Transactions Section */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="font-bold text-gray-800 mb-4">Recent Transactions</h2>
              
              {/* Transaction Item */}
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-sm">From</p>
                      <p className="text-gray-800 font-mono text-sm truncate">
                        0x1a2b...3c4d
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-sm">Amount</p>
                      <p className="text-[#4eac6f] font-bold">
                        {item * 0.01} MATIC
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-sm">Land ID</p>
                      <p className="text-gray-800 font-bold">LND-00{item}</p>
                    </div>
                    <div className="w-full md:w-auto">
                    <CustomButton
      title="View Details"
      styles="text-xs py-1 px-3 border border-gray-300 hover:bg-gray-100"
      handleClick={() => router.push(`../p_seller/transaction/${item}`)}
      buttonType="button"
    />
                    </div>
                  </div>
                ))}
              </div>

              {/* No Transactions State */}
              {/* <div className="text-center py-8 text-gray-500">
                <p>No recent transactions found</p>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <CustomButton
                title="Refresh Balance"
                styles="bg-gray-100 text-gray-800 hover:bg-gray-200"
                handleClick={() => window.location.reload()}
                buttonType="button"
              />
             
            </div>
          </div>
        )}
      </div>
    </SellerLayout>
  );
};

export default Payment_center;