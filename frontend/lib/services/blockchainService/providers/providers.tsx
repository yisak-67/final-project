import { getAlchemyProvider, writeAlchemyProvider } from "./alchemyProvider";
import {
  getmainContractProvider,
  mainContractProvider,
} from "./localHostProvider";

const intializeProviders = async () => {
  try {
    // await mainContractProvider();
    await getmainContractProvider();
    await writeAlchemyProvider();
    await getAlchemyProvider();
  } catch (error) {
    console.log("unable to initialize providers");
  }
};

export { intializeProviders };

