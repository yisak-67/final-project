import BarChart from "@/components/admin/barChart";
import JoinOurCommunity from "@/components/admin/joinOurCommunity";
import Layout from "@/components/admin/layout";
import SideBar2 from "@/components/admin/sidebar2";
import RecentTransations from "@/components/admin/recentTransaction";
import TopCards from "@/components/admin/topCards";
import UsersDashBoard from "@/components/admin/usersDashBoard";
import LandHistoryTable from "./landHistoryModel"; // New component we'll create
import { Loader } from "@/components/common";
import { User } from "@/lib/models/auth";
import { Land, Transaction} from "@/lib/models/commonModels";
import { LandHistory } from "@/lib/models/land";
import { getUserAddress_s } from "@/lib/services/blockchainService/authcontractServices";
import {
  getMonthlyLandData,
  getTotalLandsCountWithContract,
  getTotalUnverifiedLandsLength,
  getLandHistory,
  getAllLandsHistory,
} from "@/lib/services/blockchainService/landcontractServices";
import { useEffect, useState } from "react";

const getMonthLabels = (): string[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the current month
  const currentMonth = new Date().getMonth();

  // Select the months from the start of the year to the current month
  const monthLabels = months.slice(0, currentMonth + 1);

  return monthLabels;
};

const Index = () => {
  const [pendingLandsNo, setPendingLandsNo] = useState(0);
  const [verifiedLandsNo, setverifiedLandsNo] = useState(0);
  const [totalUsersLandsNo, setTotalUsersLandsNo] = useState(0);
  const [lands, setLands] = useState<Land[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [landsByMonth, setLandsByMonth] = useState<number[]>([]);
  const [landHistories, setLandHistories] = useState<LandHistory[]>([]); // State for land histories
  const [selectedLandId, setSelectedLandId] = useState<string>(""); // State for selected land ID

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const unverifedLandsLength = await getTotalUnverifiedLandsLength();
      const totalLandsLength = await getTotalLandsCountWithContract();
      const users = await getUserAddress_s();
      const landsClassifiedByMonth = await getMonthlyLandData();
      
      console.log({ landsClassifiedByMonth });
      setPendingLandsNo(unverifedLandsLength || 0);
      setverifiedLandsNo(
        parseInt(totalLandsLength?.toString()) - (unverifedLandsLength || 0)
      );
      setLandsByMonth(landsClassifiedByMonth);
      setUsers(users || []);
      
      // Fetch some initial land history (you can modify this as needed)
      if (users && users.length > 0) {
        const firstLandId = "1"; // Example - you might want to get this differently
        const histories = await getLandHistory(firstLandId);
        // const histories = await getAllLandsHistory();
        console.log({ histories });
        setLandHistories(histories);
        setSelectedLandId(firstLandId);
      }
      
      setLoading(false);
    };
    getData();
  }, []);

  const handleLandSelect = async (landId: string) => {
    try {
      setLoading(true);
      const histories = await getLandHistory(landId);
      setLandHistories(histories);
      setSelectedLandId(landId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching land history:", error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:ml-[270px] flex flex-col gap-4">
          <TopCards
            noOfTotalUsers={users.length}
            noOfUnverifiedLands={pendingLandsNo}
            noOfVerifiedLands={verifiedLandsNo}
          />
          
          <div className="p-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
            <BarChart
              labels={getMonthLabels() as never[]}
              data={landsByMonth}
            />
            <div className="w-full h-full rounded-lg shadow-md">
              <UsersDashBoard users={users} />
            </div>
          </div>
          
          {/* Land History Section */}
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Land History</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Land ID
                </label>
                <input
                  type="text"
                  value={selectedLandId}
                  onChange={(e) => setSelectedLandId(e.target.value)}
                  onBlur={() => handleLandSelect(selectedLandId)}
                  className="border rounded-md p-2 w-full"
                  placeholder="Enter Land ID"
                />
              </div>
              
              {landHistories.length > 0 ? (
                <LandHistoryTable histories={landHistories} />
              ) : (
                <p className="text-gray-500">No history found for this land</p>
              )}
            </div>
          </div>
          
          <div className="p-4 grid gap-4">
            <div className="col-span-2">
              {/* <RecentTransations recentTransactions={recentTransactions} /> */}
            </div>
            <div className="flex items-center justify-center col-span-2 mt-5">
              {/* <JoinOurCommunity /> */}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;