import { LandModel } from "@/lib/models/land";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { CustomButton } from "../common";
import Dialog from "./dialog";
import { verifyLand } from "@/lib/services/blockchainService/verficationcontractServices";
import "react-toastify/dist/ReactToastify.css";
import LandDetail from "./landDetail"; // Adjust the path based on the actual location of the LandDetail component


type Props = {
  land: LandModel;
  index: number;
  
  onClose: (value: boolean) => void;

};
const LandDetailDialog = ({
  land,
  index,
  onClose: setShowLandDetail,
}: Props) => {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyLand = async () => {
    try {
      setIsVerifying(true);
      
      // Verify land
      console.log("Verifying land with ID:", land.id);
      if (land.id !== undefined) {
        const result = await verifyLand(land.id);
    
      if (result === 0) {
        toast.success("Land verified successfully!");
        setShowLandDetail(false);
        
        // Refresh data without full page reload
        router.replace(router.asPath, undefined, { scroll: false });
      
      } else {
        toast.error("Land verification failed!");
        setShowLandDetail(false);
      }
      }


    } catch (error) {
      console.error("Error verifying land:", error);
      alert(`Error: ${(error as Error).message || "Failed to verify land"}`);
    } finally {
      setIsVerifying(false);
    }
  };
  return (
    <Dialog onClose={() => setShowLandDetail(false)}>
      <div className="flex justify-center items-center mt-10 flex-col">
        <LandDetail land={land} index={index} />
        <CustomButton
          buttonType={undefined}
          title={isVerifying ? "Verifying..." : "Verify Land"}
          handleClick={handleVerifyLand}
          disabled={isVerifying}
          styles="border border-green-500 text-green-500 rounded-md p-4 m-4 w-1/2 transition duration-300 hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </Dialog>
  );
};

export default LandDetailDialog;