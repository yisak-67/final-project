import { ethers, BrowserProvider } from "ethers";
import LandRegistery from "../../../../artifacts/contracts/LandRegistery.sol/LandRegistery.json";

declare var window: any;
const contract_address = process.env.LOCAL_CONTRACT_ADDRESS ?? "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const mainContractProvider = async () => {
  try {
    if (!window.ethereum) return;
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contract_address,
      LandRegistery.abi,
      signer
    );
    return contract;
  } catch (e) {
    console.log("not working... on mainContractProvider ");
  }
};

const getmainContractProvider = async () => {
  try {
    if (!window.ethereum) return;
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      contract_address,
      LandRegistery.abi,
      provider
    );
    return contract;
  } catch (e) {
    console.log(`error message : ${e}`);
  }
};

const getCurrentAccount = async () => {
  try {
    if (!window.ethereum) return;
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const account = await provider.getSigner();
    return account.address;
  } catch (error) {
    console.log(`error message : ${error}`);
  }
};

export { mainContractProvider, getCurrentAccount, getmainContractProvider };
