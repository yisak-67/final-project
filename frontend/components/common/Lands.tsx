import Land from "./Land";
import { LandModel } from "@/lib/models/land";
type Props = {
  lands: LandModel[];
  label: string;
};
const Lands = ({ lands, label }: Props) => {
  return (
    <div className="flex   flex-col justify-center items-center rounded-[10px] sm:p-10 p-4 m-1">
      <div className="flex justify-center items-center p-[8px] sm:min-w-[380px] bg-green-500 rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          {label}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-5 flex-wrap items-start justify-center mt-5">
        {lands.map((v: LandModel, k: any) => {
          return <Land key={k} landInfo={v} />;
        })}
      </div>
    </div>
  );
};

export default Lands;
