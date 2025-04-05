import { ContractWriteResponse } from "@/lib/models/responseMessage";
import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";
import { RequestModel, parseRequestData } from "@/lib/models/land";

const sendBuyRequestwithContract = async (
  landId: number
): Promise<ContractWriteResponse> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const transaction = await alchemyContract?.sendRequest(landId);
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message : ${error}`,
    };
  }
};

const getRecievedRequestsidList = async () => {
  try {
    const alchemyContract = await writeAlchemyProvider();

    const recievedRequests = await alchemyContract?.getRecievedRequests();
    const normalArray = Object.values(recievedRequests);

    let rRequests: RequestModel[] = [];
    for (let index = 1; index <= normalArray.length; index++) {
      const request = await getRequestbyId(index);
      console.log(request);
      rRequests.push(parseRequestData(request));
    }
    return rRequests;
  } catch (error) {}
};

const getSentRequestsidList = async () => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const sentRequests = await alchemyContract?.getSentRequests();
    const normalArray = Object.values(sentRequests);

    let requests: RequestModel[] = [];
    for (let index = 1; index <= normalArray.length; index++) {
      const request = await getRequestbyId(index);
      console.log(request);
      requests.push(parseRequestData(request));
    }
    return requests;
  } catch (error) {}
};

const getRequestbyId = async (id: number) => {
  try {
    const alchemyContract = await getAlchemyProvider();
    const request = await alchemyContract?.getRequest(id);
    return Object.assign({}, request);
  } catch (error) {}
};
const acceptRequest = async (reqId: number): Promise<ContractWriteResponse> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const transaction = await alchemyContract?.acceptRequest(reqId);
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message : ${error}`,
    };
  }
};

const rejectRequest = async (reqId: number): Promise<ContractWriteResponse> => {
  try {
    const alchemyContract = await writeAlchemyProvider();
    const transaction = await alchemyContract?.rejectRequest(reqId);
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message : ${error}`,
    };
  }
};

export {
  sendBuyRequestwithContract,
  getSentRequestsidList,
  getRecievedRequestsidList,
  acceptRequest,
  rejectRequest,
};
