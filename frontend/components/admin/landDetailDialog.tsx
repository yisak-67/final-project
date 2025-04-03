import { LandModel } from "@/lib/models/land";
import { useRouter } from "next/router";
import React from "react";
import { CustomButton } from "../common";
import Dialog from "./dialog";
import LandDetail from "./landDetail";
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
  return (
    <Dialog onClose={() => setShowLandDetail(false)}>
      <div className="flex justify-center items-center  mt-10 flex-col ">
        <LandDetail land={land} index={index} />
        <CustomButton
          buttonType={undefined}
          title="Verify"
          handleClick={() => {
            router.push({
              pathname: `/p_admin/manageLand`,
              query: {
                data: JSON.stringify(land, (_, v) =>
                  typeof v === "bigint" ? v.toString() : v
                ),
              },
            });
          }}
          styles="border border-green-500 text-green-500 rounded-md p-4 m-4 w-1/2 transition duration-300 hover:bg-green-500 hover:text-white"
        />
      </div>
    </Dialog>
  );
};

export default LandDetailDialog;
