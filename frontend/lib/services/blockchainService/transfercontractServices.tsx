import { RequestModel, parseRequestData } from "@/lib/models/land";
import {
  getAlchemyProvider,
  writeAlchemyProvider,
} from "./providers/alchemyProvider";
import { getmainContractProvider } from "./providers/localHostProvider";
import { ContractWriteResponse } from "@/lib/models/responseMessage";
import { parseUser } from "@/lib/models/auth";

const transerLandTitle = async (
  id: number
): Promise<ContractWriteResponse | null> => {
  try {
    const alchemyContract = await writeAlchemyProvider();

    const transaction = await alchemyContract?.transferlandtitle(id);
    await transaction.wait();
    return { status: true };
  } catch (error) {
    return {
      status: false,
      data: `error message  ${error}`,
    };
  }
};

const getAllRequestsListWithContract = async () => {
  try {
    const length = await getTotalRequesCountWithContract();
    const alchemyContract = await getAlchemyProvider();
    let requests: RequestModel[] = [];
    for (let i = 1; i <= length; i++) {
      const request = await getRequestWithContract(i);
      let temp = Object.assign({}, request);
      console.log({ temp });
      const paresedRequest = parseRequestData(temp);
      if (paresedRequest.isPaymentDone) {
        const response1 = await alchemyContract?.getUser(
          paresedRequest.sellerId
        );
        const seller = parseUser({ ...response1 });
        const response2 = await alchemyContract?.getUser(
          paresedRequest.sellerId
        );
        const buyer = parseUser({ ...response2 });
        paresedRequest.sellerName = seller.fullName;
        paresedRequest.buyerName = buyer.fullName;
        requests.push(paresedRequest);
      }
    }
    console.log(requests);
    return requests;
  } catch (error) {
    return [];
  }
};

const getTotalRequesCountWithContract = async (): Promise<number> => {
  try {
    const alchemyContract = await getAlchemyProvider();
    const total = await alchemyContract?.requestCount();
    return total;
  } catch (error) {
    console.log(`error message : ${error}`);
    return 0;
  }
};

const getRequestWithContract = async (id: number) => {
  try {
    const contract = await getmainContractProvider();
    const alchemyContract = await getAlchemyProvider();
    const data = await alchemyContract?.getRequest(id);
    return data;
  } catch (error) {
    console.log(`error message : ${error}`);
  }
};

export { getAllRequestsListWithContract, transerLandTitle, getRequestWithContract, getTotalRequesCountWithContract };
