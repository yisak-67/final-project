import { LandModel } from "@/lib/models/land";

type LandCardProps = {
  land: LandModel;
};

const LandCard: React.FC<LandCardProps> = ({ land }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 border p-4 my-2">
      <div className="col-span-1">
        <h2 className="font-bold">ID</h2>
        <p>{land.id}</p>
      </div>
      <div className="col-span-1">
        <h2 className="font-bold">Owner Information</h2>
        <p>{land.postedBy}</p>
      </div>
      <div className="col-span-1">
        <h2 className="font-bold">Area (sq meters)</h2>
        <p>{land.locationAddress?.toString()} Sq meter.</p>
      </div>
      <div className="col-span-1">
        <h2 className="font-bold">Location Information</h2>
        {land.landAddress}
      </div>
      <div className="col-span-1">
        <h2 className="font-bold">Land Image</h2>
        <img
          src={land.documentHash}
          alt="Land Image"
          className="w-full h-24 object-cover"
        />
      </div>
    </div>
  );
};

export default LandCard;
