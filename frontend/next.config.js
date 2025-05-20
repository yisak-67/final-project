/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [""],
  },
  transpilePackages: [
    'rc-util',
    'rc-tree',
    'rc-picker',
    'rc-trigger',
    'rc-field-form',
    'rc-tabs',
    'rc-resize-observer',
    'rc-motion',
    'rc-pagination',
    'rc-table',
    'antd',
    'rc-input',                    // ← ✅ add this one
    '@ant-design/icons',
    '@ant-design/icons-svg',
  ],
  
  env: {
    PINATA_API_KEY: "ed6ee4af79c4feb7a5ff",
    PINATA_SECRET_API_KEY: "c05a7c3972626e116bc16fb614c84dbbab2e2d1ae4c107c5c6410337760c8d46",
    MAP_BOX_TOKEN: "pk.eyJ1IjoiZnJlbmVoIiwiYSI6ImNtODl1ZzA3NjEwcWMybXM1ODFoandidjUifQ.c4rSJWEpCkNaCnjf8U-5fQ",
    NFT_URL: "https://api.nft.storage/",
    NFT_API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNBY2IwQUVBMUE4NDk3Njk2NzExQTNEYjQ0MzE5NTlEQzNhM0MyZjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3Nzg0NzM0MDU3MiwibmFtZSI6ImxhbmQtcmVnaXN0cnktZmlsZXMifQ.rLkiIlSTvy7nWCrLrvFDPgvXRuETpXzkAJtQVmPqg4o",
    LOCAL_CONTRACT_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    REMOTE_NETWORK_URL: "https://eth-sepolia.g.alchemy.com/v2/KCopl95ZOPKuhSDenFU3vDtqQ2iFzpzS",
    POLYGON_MATIC_CONTRACT_ADDRESS: "0x8A0d1EF862577C2Ac936635A0d8Ab52961BAce32",
    ALCHEMY_URL: "https://eth-sepolia.g.alchemy.com/v2/KCopl95ZOPKuhSDenFU3vDtqQ2iFzpzS",
    CONTRACT_ADDRESS_ON_ALCHEMY: "0x36c1E6f2d5a2Fd18Ba7D185A2fBC604E3C734Fb6",
    LOCALLAND_ARCHIVE_API_URL: "http://localhost:3001/lands",
  },
};

module.exports = nextConfig;
// 0xd7CDcBf8E626815C41C2dD268b81B854A312F546
//0x1b2f46a166CC9dB1f9c47adF493D273161d05078
//0x65220cEE139a93B7d552a467f66F24b37403F61F
//  0x8d13f938506B3144A31347e63d0890953C90E8a1
//0x8A0d1EF862577C2Ac936635A0d8Ab52961BAce32
// 0x36c1E6f2d5a2Fd18Ba7D185A2fBC604E3C734Fb6