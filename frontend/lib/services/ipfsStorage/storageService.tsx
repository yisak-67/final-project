// import {
//   ApiResponse,
//   ErrorMessage,
//   NftResponse,
//   ValueResponse,
// } from "@/lib/models/responseMessage";
// import { AxiosError } from "axios";
// import { nftstorageClient } from "./storageClient";

// const uploadFileWithnftStorage = async (
//   file: File
// ): Promise<string | ErrorMessage> => {
//   try {
//     const result = await nftstorageClient.post<NftResponse<ValueResponse>>(
//       "upload",
//       file
//     );
//     if (result.status === 200) {
//       return "https://" + result.data?.value?.cid + ".ipfs.dweb.link";
//       // return "ipfs://" + result.data?.value?.cid + "/landImage.gif";
//     }
//     return "";
//   } catch (error) {
//     const err = (error as AxiosError<ApiResponse>).response!.data;
//     return {
//       code: err.code,
//       message: err.message!,
//     };
//   }
// };

// export { uploadFileWithnftStorage };
import {
  ApiResponse,
  ErrorMessage,
  NftResponse,
  ValueResponse,
} from "@/lib/models/responseMessage";
import { AxiosError } from "axios";
import { pinataClient } from "./storageClient";

const uploadFileWithPinata = async (
  file: File
): Promise<string | ErrorMessage> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const result = await pinataClient.post<NftResponse<ValueResponse>>(
      "/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (result.status === 200) {
      return "https://gateway.pinata.cloud/ipfs/" + result.data.IpfsHash;
    }
    return "";
  } catch (error) {
    const err = (error as AxiosError<ApiResponse>).response!.data;
    return {
      code: err.code,
      message: err.message!,
    };
  }
};

export { uploadFileWithPinata };