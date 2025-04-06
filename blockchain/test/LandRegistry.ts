import { expect } from "chai";
import { Contract } from "ethers";

import { ethers } from "hardhat";

describe("Deployment", () => {
  let contract: Contract;
  let owner;
  

  beforeEach(async () => {
    const LandRegistry = await ethers.getContractFactory("LandRegistery");
    const landRegistry = await LandRegistry.deploy();
    contract = await landRegistry.deployed();
  });

  it("Should create new user and returns true", async () => {
    const createUserResult = await contract.registerUser(
      "string memory _fullName",
      "string memory _profileHash",
      "string memory _email",
      "string memory _password",
      "string memory _addressLocation",
      "string memory _phoneNumber",
      "string memory _role"
    );
    expect(createUserResult.accessList.length).to.equal(0);
  });
  it("Should login new user with sytem", async () => {
    const loginUser = await contract.login(
      "string memory _email",
      "string memory _password"
    );
    expect(loginUser.confirmations).to.equal(1);
  });
});