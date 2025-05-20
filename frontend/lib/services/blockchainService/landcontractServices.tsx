import { ContractWriteResponse } from "@/lib/models/responseMessage";
import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";
import {
  getmainContractProvider,
  mainContractProvider,
} from "./providers/localHostProvider";
import {
  LandModel,
  parseLandData,
  LandUpdateModel,
  RequestModel,
  LandHistory,
} from "@/lib/models/land";
import { toBigInt, ethers } from "ethers";
import { User, parseUser } from "@/lib/models/auth";
import { landComparingImageApiUrl } from "@/utils/constants";
import axios from "axios";

const createLandWithContract = async (
  landinfo: LandModel
): Promise<ContractWriteResponse> => {
  try {
    const contract = await mainContractProvider();
    const alchemyContract = await writeAlchemyProvider();
    console.log("Main contract:", contract);
    console.log("Alchemy contract:", alchemyContract);

    const transaction = await alchemyContract?.createLand(
      landinfo.title ?? "",
      landinfo.documentHash ?? "",
      ethers.parseUnits(landinfo?.price ?? "", 3),
      landinfo.locationAddress ?? "",
      landinfo.landAddress ?? "",
      landinfo.detail ?? "",
      toBigInt(landinfo?.postedDate?.getTime() ?? ""),
      ethers.parseUnits(landinfo?.area ?? "", 3)
    );
    await transaction.wait();
    console.log("transaction done",transaction);
    return { status: true };
  } catch (e) {
    return {
      status: false,
      data: `error message : ${e}`,
    };
  }
};

const getLandWithContract = async (id: number) => {
  try {
    const contract = await getmainContractProvider();
    const alchemyContract = await getAlchemyProvider();
    const data = await alchemyContract?.getLand(id);

    return data;
  } catch (error) {
    console.log(`error message : ${error}`);
  }
};

const getTotalLandsCountWithContract = async (): Promise<number> => {
  try {
    const contract = await getmainContractProvider();
    const alchemyContract = await getAlchemyProvider();
    const total = await alchemyContract?.landsTotal();
    return total;
  } catch (error) {
    console.log(`error message : ${error}`);
    return 0;
  }
};
const getMonthlyLandData = async (): Promise<number[]> => {
  const date = new Date();
  const month = date.getMonth();
  const lands = Array(month + 1).fill(0);
  const allLands = await getAllLandsListWithContract();
  for (let land of allLands) {
    const date = land.postedDate;
    const month = date?.getMonth();
    if (month) lands[month]++;
  }
  return lands;
};
const getUnverifiedLandsWithContract = async () => {
  try {
    let lands = await getAllLandsListWithContract();
    let unverifiedLands: LandModel[] = [];
    for (const land of lands) {
      if (!land.isVerified) {
        unverifiedLands.push(land);
      }
    }
    return unverifiedLands;
  } catch (error) {
    console.log(`Error while fetching unverified lands ${error}`);
    return [];
  }
};
const getTotalUnverifiedLandsLength = async () => {
  try {
    const respose = await getUnverifiedLandsWithContract();
    return respose.length;
  } catch (error) {}
};
const getAllLandsListWithContract = async () => {
  let lands: LandModel[] = [];
  try {
    const length = await getTotalLandsCountWithContract();
    const alchemyContract = await getAlchemyProvider();

    for (let i = 1; i <= length; i++) {
      const land = await getLandWithContract(i);
      let temp = Object.assign({}, land);
      const parsedLand = parseLandData(temp);
      console.log({ postedBy: parsedLand.postedBy });
      const response = await alchemyContract?.getUser(parsedLand.postedBy);
      console.log({ response });
      const user = response as User;
      parsedLand.postedBy = user.fullName;
      console.log("working on land");
      console.log(temp);
      lands.push(parsedLand);
    }
    return lands;
  } catch (error) {
    console.log("Error while fetching lands", { error });
    return lands;
  }
};
const fetchLands = async (): Promise<LandModel[]> => {
  try {
    const response = await axios.get("http://localhost:3001/lands");
    console.log({ landFetchResponse: response });
    return response.data;
  } catch (error) {
    throw Error("Failed to fetch lands");
  }
};
const getLandHistory = async (id: string): Promise<LandHistory[]> => {
  try {
    const alchemyContract = await getAlchemyProvider();
    const response = await alchemyContract?.getLandHistory(id);
    console.log({ response });
    const history = { ...response };
    console.log({ history });
    const landHistory: LandHistory[] = [];
    const keys = Object.keys(history);
    for (let key of keys) {
      landHistory.push({
        user: parseUser(history[key][0]),
        date: new Date(Number(history[key][1]) * 1000),
      });
    }

    console.log({ landHistory });
    return landHistory;
  } catch (error) {
    console.log("Error while fetching land history");
    console.log({ error });
    throw Error("Faild to fetch land histories");
  }
};
const checkImageCompatibility = async (
  image1: string,
  image2: string
): Promise<boolean> => {
  try {
    const url = landComparingImageApiUrl;
    const data = {
      image1,
      image2,
    };
    const response = await axios.post(url, data);
    console.log({ statusCode: response.status });
    console.log({ responseData: response.data });
    const responseData = response.data.compatibility;
    console.log({ responseData });
    if (responseData >= 75) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const verifyLand = async (land: LandModel) => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const lands = await fetchLands();
    console.log({ lands });
    let landInArchive;
    for (let l of lands) {
      console.log({ owner: l.postedBy, landOwer: land.postedBy });
      if (l.postedBy == land.postedBy) {
        console.log("Owner is found");
        landInArchive = l;
        break;
      }
    }
    if (!landInArchive) {
      return 2;
    }
    let compatibility = await checkImageCompatibility(
      land.documentHash || "",
      landInArchive.documentHash || ""
    );
    console.log({ compatibility });
    if (compatibility) {
      const response = await alchemyContract?.verifyLand(land.id);
      if (response) {
        return 0;
      }
      return 1;
    }
    return 1;
  } catch (error) {
    return 1;
  }
};
const updateLandInfoWithContract = async (
  updateLandinfo: LandUpdateModel
): Promise<ContractWriteResponse> => {
  try {
    console.log("working... update");
    console.log(updateLandinfo);
    const alchemyContract = await writeAlchemyProvider();
    const transaction = await alchemyContract?.updateLandInfo(
      updateLandinfo.id,
      ethers.parseUnits(updateLandinfo?.price ?? "", 3),
      updateLandinfo.detail ?? ""
    );
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message : ${error}`,
    };
  }
};
const getAllLandsHistory = async () => {
  try {
    const alchemyContract = await getAlchemyProvider();
    const response = await alchemyContract?.getAllLandsHistory();
    console.log({ response });
    const history = { ...response };
    console.log({ history });
    const landHistory: LandHistory[] = [];
    const keys = Object.keys(history);
    for (let key of keys) {
      landHistory.push({
        user: parseUser(history[key][0]),
        date: new Date(Number(history[key][1]) * 1000),
      });
    }

    console.log({ landHistory });
    return landHistory;
  } catch (error) {
    console.log("Error while fetching land history");
    console.log({ error });
    throw Error("Faild to fetch land histories");
  }
}

export {
  createLandWithContract,
  getLandWithContract,
  getTotalLandsCountWithContract,
  getUnverifiedLandsWithContract,
  getAllLandsListWithContract,
  updateLandInfoWithContract,
  verifyLand,
  getTotalUnverifiedLandsLength,
  getLandHistory,
  getMonthlyLandData,
  checkImageCompatibility,
  fetchLands,
  getAllLandsHistory,


};
