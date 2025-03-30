import { ethers } from "ethers";
import LandRegistery from "../../../../artifacts/contracts/LandRegistery.sol/LandRegistery.json";

declare var window: any;
const AlchemyContractAddress = process.env.CONTRACT_ADDRESS_ON_ALCHEMY ?? "";
console.log(AlchemyContractAddress)
const writeAlchemyProvider = async (): Promise<ethers.Contract | null> => {
  try {
    if (!window.ethereum) return null;

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const walletProvider = new ethers.BrowserProvider(window.ethereum);

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
    console.log(process.env.ALCHEMY_URL)
    const signer = await walletProvider.getSigner();

    const writeContract = new ethers.Contract(
      AlchemyContractAddress,
      LandRegistery.abi,
      signer
    );
    return writeContract;
  } catch (error) {
    console.log(`errror ${error}`);
    return null;
  }
};

const getAlchemyProvider = async (): Promise<ethers.Contract | null> => {
  try {
    if (!window.ethereum) return null;

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
    const getcontract = new ethers.Contract(
      AlchemyContractAddress,
      LandRegistery.abi,
      provider
    );
    return getcontract;
  } catch (error) {
    console.log(`error ${error}`);
    return null;
  }
};

export { writeAlchemyProvider, getAlchemyProvider };
