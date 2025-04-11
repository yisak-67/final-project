import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";

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
const verifyLand = () => {};
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
