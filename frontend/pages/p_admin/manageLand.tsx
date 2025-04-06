import { CustomButton, Loader } from "@/components/common";
import { verifyLand } from "@/lib/services/blockchainService/landcontractServices";
import { useState } from "react";
import { LandModel } from "@/lib/models/land";
import Layout from "@/components/admin/layout";
import { GetStaticProps } from "next";
import LandsList from "@/components/admin/land/landList";
import Header from "@/components/admin/land/header";
import { useRouter } from "next/router";
import LandDetail from "@/components/admin/landDetail";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllLands from "@/components/admin/allLands";
export const getStaticProps: GetStaticProps = async () => {
  try {
    const url: string =
      process.env.LOCALLAND_ARCHIVE_API_URL || "http://localhost:3001/lands";
    const response = await fetch(url);
    const lands: LandModel[] = await response.json();
    return { props: { lands } };
  } catch (error: any) {
    console.log(`Error while fetching archive, ${error.toString()}`);
    return { props: { lands: [] } };
  }
};
const Tabs: React.FC<{ lands: LandModel[] }> = ({ lands }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="w-full">
      <nav className="-mb-px flex w-full">
        <button
          onClick={() => setActiveTab(0)}
          className={`w-1/2 py-4 px-1 text-center border-b-4 ${
            activeTab === 0 ? "border-gray-300" : "border-transparent"
          } text-sm font-medium text-black transition-all duration-200 ease-in-out`}
        >
          All Lands
        </button>

        <div className="absolute  top-0 bottom-0 border-r border-white/20"></div>

        <button
          onClick={() => setActiveTab(1)}
          className={`w-1/2 py-4 px-1 text-center border-b-4 ${
            activeTab === 1 ? "border-gray-300" : "border-transparent"
          } text-sm font-medium text-black transition-all duration-200 ease-in-out`}
        >
          Land Archive
        </button>
      </nav>
      <div className="w-full">
        {activeTab === 0 && (
          <div className="p-6">
            <AllLands />
          </div>
        )}
        {activeTab === 1 && (
          <div className="p-6">
            <Header title="Land Archive" />
            <LandsList lands={lands} />
          </div>
        )}
      </div>
    </div>
  );
};
const ManageLand = ({ lands }: { lands: LandModel[] }) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const data = router.query.data
    ? (JSON.parse(router.query.data as string) as LandModel)
    : null;
  if (data != null) {
    data.postedDate = new Date(data.postedDate || "");
  }
  const verifyNewLand = async (land: LandModel) => {
    try {
      setShowLoader(true);
      const response = await verifyLand(land);
      if (response == 0) {
        toast.success("Land Verified");
      } else {
        toast.error("Verification failed");
      }
      setShowLoader(false);
    } catch (error) {
      console.log("Error while land verification");
      toast.error("Server Error");
    }
    router.push("/p_admin/verification");
    setShowLoader(false);
  };
  return (
    <Layout>
      {showLoader && <Loader />}
      <div className="md:ml-[270px] h-full flex flex-col ">
        {data && (
          <>
            <div className="flex justify-center items-center">
              <h1 className="font-bold m-5 ">Check Against land archive</h1>
            </div>
            <LandDetail
              land={data}
              index={0}
              button={
                <CustomButton
                  title={"Verify"}
                  buttonType={undefined}
                  styles="border border-green-500 text-green-500 rounded-md py-2 px-4 transition duration-300 hover:bg-green-500 hover:text-white"
                  handleClick={() => {
                    verifyNewLand(data);
                  }}
                />
              }
            />
          </>
        )}
        <Tabs lands={lands} />
      </div>
    </Layout>
  );
};

export default ManageLand;
