// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const config: HardhatUserConfig = {
//   solidity: {
//     version: "0.8.17",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 1000,
//       },
//     },
//   },
//   paths: {
//     artifacts: "../frontend/artifacts",
//   },

//   networks: {
//     hardhat: {
//       chainId: 1337,
//     },
//     polygon_mumbai: {
//       url: "https://polygon-mumbai.g.alchemy.com/v2/9YRdKIGi3PLgEUjVdxt5Cn3Y2nEwHnzd",
//       accounts: [
//         `0xfb7cfa46a786941f95417ab809acc2632649a15edcfe17dc409ac0f47d7772da`,
        
//       ],
//     },
//   },
// };

// export default config;
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
        
  paths: {
    artifacts: "../frontend/artifacts",
  },

  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/KCopl95ZOPKuhSDenFU3vDtqQ2iFzpzS", // Replace with Alchemy or Infura URL
      accounts: [`0x227825931a1d3c0ebd17b00368fc492d017532ed70bde4b518b087bdc58452e7`], // Replace with your private key
    },
  },
};

export default config;
