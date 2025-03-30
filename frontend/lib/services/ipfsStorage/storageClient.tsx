// import axios from "axios";

// const nftheader = { Authorization: `Bearer ${process.env.NFT_API_KEY}` };

// const nftstorageClient = axios.create({
//   baseURL: `${process.env.NFT_URL}`,
//   headers: nftheader,
// });

// export { nftstorageClient };
import axios from "axios";

const pinataHeader = {
  pinata_api_key: process.env.PINATA_API_KEY,
  pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
};

const pinataClient = axios.create({
  baseURL: "https://api.pinata.cloud",
  headers: pinataHeader,
});

export { pinataClient };
