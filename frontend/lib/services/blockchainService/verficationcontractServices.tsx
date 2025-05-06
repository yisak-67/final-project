import { id } from "ethers";
import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";
import internal from "stream";

const verifyUser = async (address: string): Promise<number> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const response = await alchemyContract?.verifyUser(address);
    if (response) {
      return 0;
    } else {
      return 1;
    }
  } catch (error: any) {
    console.log("Error while verifying user", error.toString());
    return 1;
  }
};
const grantRevoke = async (address: string): Promise<number> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const response = await alchemyContract?.grantRevoke(address);
    console.log({ response });
    if (response) {
      return 0;
    } else {
      return 1;
    }
  } catch (error: any) {
    console.log("Error while revoking/granting access", error.toString());
    return 1;
  }
};
const verifyLand = async (id: number): Promise<number> => {
  try {
    console.log("Verifying land with ID:", id);
    const alchemyContract = await writeAlchemyProvider();
    if (!alchemyContract) {
      console.error("Contract not initialized");
      return 1;
    }

    // Send transaction
    const tx = await alchemyContract.verifyLand(id);
    
    // Wait for transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction hash:", tx.hash);
    
    // Check if transaction was successful
    if (receipt.status === 1) {
      return 0; // Success
    } else {
      return 1; // Failure
    }
  } catch (error: any) {
    console.error("Error verifying land:", error);
    // Parse specific error messages if needed
    if (error.code === 4001) {
      console.log("User rejected transaction");
    }
    return 1;
  }
};
const addAdmin = async (address: string): Promise<number> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const response = await alchemyContract?.addAdmin(address);
    if (response) {
      return 0;
    } else {
      return 1;
    }
  } catch (error: any) {
    console.log("Error while adding admin", error.toString());
    return 1;
  }
}
const getUsers = () => {};
const getLands = () => {};
const getVerifiedUsers = () => {};
const getVerifiedLands = () => {};

export {
  verifyLand,
  verifyUser,
  getUsers,
  getLands,
  getVerifiedLands,
  getVerifiedUsers,
  grantRevoke,
};