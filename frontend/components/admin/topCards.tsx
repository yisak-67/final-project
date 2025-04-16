import CardComponenet from "./cardComponent";
type Props = {
  noOfUnverifiedLands: number;
  noOfVerifiedLands: number;
  noOfTotalUsers: number;
};
const TopCards = ({
  noOfUnverifiedLands,
  noOfVerifiedLands,
  noOfTotalUsers,
}: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      <CardComponenet
        label="Verified Lands"
        value={noOfVerifiedLands.toString()}
        percentage="+10%"
      />
      <CardComponenet
        label="New Lands"
        value={noOfUnverifiedLands.toString()}
        percentage="+10%"
      />
      <CardComponenet
        label="Total Users "
        value={noOfTotalUsers.toString()}
        percentage="+10%"
      />
    </div>
  );
};

export default TopCards;
