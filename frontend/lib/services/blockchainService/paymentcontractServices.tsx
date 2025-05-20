import { ContractWriteResponse } from "@/lib/models/responseMessage";
import { ethers } from "ethers";
import LandRegistery from "./../../../artifacts/contracts/LandRegistery.sol/LandRegistery.json";
import { getAlchemyProvider, writeAlchemyProvider } from "./providers/alchemyProvider";

declare var window: any;
const AlchemyContractAddress = process.env.CONTRACT_ADDRESS_ON_ALCHEMY ?? "";

const makePaymentUsingWallet = async (
  id: number,
  reciverAddress: string
): Promise<ContractWriteResponse | null> => {
  try {
    const alchemyContract = await writeAlchemyProvider();

    const valueToSend = ethers.parseEther("0.001");
    const transaction = await alchemyContract?.makePayment(id, {
      value: valueToSend,
    });
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message  ${error}`,
    };
  }
};

const getCurrentBalance = () => {};
const getRecentTransactions = async () => {
  // Implement the logic to fetch recent transactions

try {
    const alchemyContract = await getAlchemyProvider();
    const transactions = await alchemyContract?.getRecentTransactions();
    return transactions;
  } catch (error) {
    console.log(`error message : ${error}`);
  }
};

export { makePaymentUsingWallet, getCurrentBalance , getRecentTransactions };
