import { ContractWriteResponse } from "@/lib/models/responseMessage";
import { ethers } from "ethers";
import LandRegistery from "./../../../artifacts/contracts/LandRegistery.sol/LandRegistery.json";
import { writeAlchemyProvider } from "./providers/alchemyProvider";

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

export { makePaymentUsingWallet, getCurrentBalance };
