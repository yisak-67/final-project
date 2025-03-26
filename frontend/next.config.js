/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [""],
  },
  env: {
    PINATA_API_KEY:"ed6ee4af79c4feb7a5ff",
  PINATA_SECRET_API_KEY:"c05a7c3972626e116bc16fb614c84dbbab2e2d1ae4c107c5c6410337760c8d46",
    MAP_BOX_TOKEN:
      "pk.eyJ1IjoiZnJlbmVoIiwiYSI6ImNtODl1ZzA3NjEwcWMybXM1ODFoandidjUifQ.c4rSJWEpCkNaCnjf8U-5fQ",
    NFT_URL: "https://api.nft.storage/",
    NFT_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNBY2IwQUVBMUE4NDk3Njk2NzExQTNEYjQ0MzE5NTlEQzNhM0MyZjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Nzg0NzM0MDU3MiwibmFtZSI6ImxhbmQtcmVnaXN0cnktZmlsZXMifQ.rLkiIlSTvy7nWCrLrvFDPgvXRuETpXzkAJtQVmPqg4o",
    LOCAL_CONTRACT_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    REMOTE_NETWORK_URL:
    "https://eth-sepolia.g.alchemy.com/v2/KCopl95ZOPKuhSDenFU3vDtqQ2iFzpzS",
    POLYGON_MATIC_CONTRACT_ADDRESS:
      "0x1b2f46a166CC9dB1f9c47adF493D273161d05078",
    ALCHEMY_URL:
      "https://eth-sepolia.g.alchemy.com/v2/KCopl95ZOPKuhSDenFU3vDtqQ2iFzpzS",
    CONTRACT_ADDRESS_ON_ALCHEMY: "0xF41Bf1635c7e8AEa0F5362113B78f1790Ad887DD",
    LOCALLAND_ARCHIVE_API_URL: "http://localhost:3001/lands",
  },
};

module.exports = nextConfig;

