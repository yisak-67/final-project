import { LandModel } from "@/lib/models/land";
import { verifyLand } from "@/lib/services/blockchainService/landcontractServices";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
type Props = {
  landInfo: LandModel;
  onClick?: () => void;
};
const Land = ({ landInfo, onClick }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const verify = async (land: LandModel) => {
    setIsUpdating(true);
    let response = await verifyLand(land);
    if (response == 0) {
      window.alert("Succeess");
    } else {
      window.alert("Failed");
    }
    router.back();
    setIsUpdating(false);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mt-5 pb-5 h-100 block">
      <img className="w-full h-20" src={landInfo.documentHash} alt="Image" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{landInfo.detail}</h2>
        <p className="text-gray-700 text-base mb-2">
          {landInfo.price?.toString()}
        </p>
        <p className="text-gray-700 text-base mb-2">{landInfo.documentHash}</p>
        <p className="text-gray-700 text-base mb-2">{landInfo.detail}</p>
        <p className="text-gray-700 text-base mb-4">
          {landInfo.postedDate?.toString()}
        </p>
        {!landInfo.isVerified && (
          <button
            onClick={() => verify.bind(this, landInfo)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full float-right"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default Land;
