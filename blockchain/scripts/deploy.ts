const { ethers } = require("hardhat");

async function main() {
    const LandRegistery = await ethers.getContractFactory("LandRegistery");
    const landRegistery = await LandRegistery.deploy();
    
    await landRegistery.deployed();
    console.log(`LandRegistery deployed to: ${landRegistery.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });