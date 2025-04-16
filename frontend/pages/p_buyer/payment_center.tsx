import BuyerLayout from "@/layout/BuyerLayout";
import React from "react";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
declare var window: any;

const PaymentCenter = () => {
  const [balance, setBalance] = useState<string>("");
  const [userAddress, setuserAddress] = useState("");

  useEffect(() => {
    // Connect to the provider (MetaMask)

    const provider = new ethers.BrowserProvider(window.ethereum);
    // Function to get the account balance
    const getAccountBalance = async (): Promise<void> => {
      try {
        // Get the signer (account) from the provider
        const signer = provider.getSigner();

        // Get the current account address
        const address = await (await signer).getAddress();

        setuserAddress(address.toString());
        // Get the account balance
        const balance = await provider.getBalance(address);

        // Convert the balance from wei to ether
        const etherBalance = ethers.formatEther(balance);

        // Set the account balance state
        setBalance(etherBalance);
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    };

    // Call the function to get the account balance
    getAccountBalance();
  }, []);

  return (
    <BuyerLayout>
      <div className="ml-[270px] h-[93vh]">
        <h1 className="font-epilogue font-bold sm:text-[18px] text-[12x] text-[#4eac6f] leading-[30px]  py-3 ml-10">
          Payment Center working..
        </h1>

        <div className="p-10 mb-4  border border-solid border-gray-100 shadow ring-1 ring-gray-50 w-[1000px]  ml-24 mt-10">
          <div className="flex  items-center justify-between">
            <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate px">
              Account{" "}
              <span className="text-[#b2b3bd] text-[15px]">{userAddress}</span>
            </p>
            <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate px text-right">
              Balance
              <span className="text-[#b2b3bd]  font-bold text-[15px] ml-3">
                {balance} Matic
              </span>
            </p>
          </div>
          <div className="py-2 my-2">
            <p className="flex-1 font-mono font-bold text-[15px]  truncate px">
              Recent Transaction{" "}
            </p>
            <div className="px-2 py-4 flex flex-col gap-3">
              <div className="flex  items-center justify-around">
                <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate ">
                  From :
                  <span className="text-[#b2b3bd] text-[15px]">
                    0xxxxxxxxxxxxxxxxxxxxxxxxxxx
                  </span>
                </p>
                <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate ">
                  Amount:
                  <span className="text-[#b2b3bd]  font-bold text-[15px] ml-3">
                    0.034 Matic
                  </span>
                </p>
                <p className="flex-1 font-mono font-normal text-[12px] text-[#808191] truncate  ">
                  To:
                  <span className="text-[#b2b3bd]  font-bold text-[15px] ml-3">
                    Land Id 3
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default PaymentCenter;
