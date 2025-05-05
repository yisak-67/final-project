import React, { useEffect, useState } from "react";
import { 
  FiPackage, FiDollarSign, FiUsers, FiTrendingUp,
  FiClock, FiCheckCircle, FiAlertCircle, FiCalendar,
  FiPlus, FiList, FiMessageSquare, FiActivity, FiMap
} from "react-icons/fi";
import { 
  getAllLandsListWithContract, 
  getMonthlyLandData 
} from "@/lib/services/blockchainService/landcontractServices";
import { 
  getAllRequestsListWithContract 
} from "@/lib/services/blockchainService/transfercontractServices";
import { 
  getUserAddress_s,
  initialLoadUser 
} from "@/lib/services/blockchainService/authcontractServices";
import { formatDistanceToNow } from "date-fns";
import SellerLayout from "@/layout/SellerLayout";
import { LandModel, RequestModel, RequestStutus } from "@/lib/models/land";
import { User } from "@/data/land";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/common/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/common/select";
import { Button } from "../../components/common/button";
import { Badge } from "../../components/common/badge";
import { Skeleton } from "../../components/common/sekeleton";
import { Progress } from "../../components/common/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/common/table";
import { useRouter } from "next/router";
import BarChart from "@/components/admin/barChart";
import { Loader } from "@/components/common";

const getMonthLabels = (): string[] => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const currentMonth = new Date().getMonth();
  return months.slice(0, currentMonth + 1);
};

const SellerDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState([
    { title: "Total Listings", value: "0", icon: <FiPackage />, trend: "0%", trendPositive: true },
    { title: "Revenue", value: "$0", icon: <FiDollarSign />, trend: "0%", trendPositive: true },
    { title: "Active Buyers", value: "0", icon: <FiUsers />, trend: "0%", trendPositive: true },
    { title: "Conversion Rate", value: "0%", icon: <FiTrendingUp />, trend: "0%", trendPositive: true },
  ]);
  
  const [recentActivities, setRecentActivities] = useState<Array<{
    id: number;
    action: string;
    time: string;
    status: 'completed' | 'pending' | 'rejected';
  }>>([]);
  
  const [lands, setLands] = useState<LandModel[]>([]);
  const [requests, setRequests] = useState<RequestModel[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [landsByMonth, setLandsByMonth] = useState<number[]>([]);

  const fetchCurrentUser = async () => {
    try {
      const user = await initialLoadUser();
      console.log("User fetched:", { user });
      if (user) {
        setCurrentUser({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          addressLocation: user.addressLocation,
          profileHash: user.profileHash,
          Role: user.Role,
          password: user.password,
          phoneNumber: user.phoneNumber,
          isVerified: user.isVerified,
          isLoggedIn: user.isLoggedIn,
          dateJoined: user.dateJoined,
        });
      }
      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // First fetch the current user
      const user = await fetchCurrentUser();
      if (!user) {
        throw new Error("No authenticated user found");
      }

      // Then fetch other data in parallel
      const [landsData, requestsData, monthlyData] = await Promise.all([
        getAllLandsListWithContract(),
        getAllRequestsListWithContract(),
        getMonthlyLandData()
      ]);
console.log(user.fullName?.toString())
      // Filter data for current user
      const userLands = landsData.filter(land => 
        land.postedBy?.toString().toLowerCase() === user.fullName?.toString().toLowerCase()
      );

      const userRequests = requestsData.filter(req => 
        req.sellerId === user.id
      );

      setLands(userLands);
      setRequests(userRequests);
      setLandsByMonth(monthlyData);

      // Calculate stats
      const totalListings = userLands.length;
      const revenue = userLands.reduce((sum, land) => sum + parseFloat(land.price || "0"), 0);
      const activeBuyers = new Set(userRequests.map(req => req.buyerId)).size;
      
      const completedRequests = userRequests.filter(req => req.status === RequestStutus.Completed).length;
      const conversionRate = userRequests.length > 0 
        ? Math.round((completedRequests / userRequests.length) * 100)
        : 0;

      // Calculate trends
      const calculateTrend = (current: number, previous: number) => {
        if (previous === 0) return current === 0 ? 0 : 100;
        return Math.round(((current - previous) / previous) * 100);
      };

      const lastMonthCount = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : 0;
      const currentMonthCount = monthlyData.length > 0 ? monthlyData[monthlyData.length - 1] : 0;
      
      const listingTrendValue = calculateTrend(currentMonthCount, lastMonthCount);
      const revenueTrendValue = calculateTrend(revenue, revenue * 0.9);
      const buyersTrendValue = calculateTrend(activeBuyers, Math.max(activeBuyers - 2, 0));
      const conversionTrendValue = calculateTrend(conversionRate, Math.max(conversionRate - 5, 0));

      setStats([
        { 
          title: "Total Listings", 
          value: totalListings.toString(), 
          icon: <FiPackage />, 
          trend: `${Math.abs(listingTrendValue)}%`,
          trendPositive: listingTrendValue >= 0
        },
        { 
          title: "Revenue", 
          value: `$${revenue.toFixed(2)}`, 
          icon: <FiDollarSign />, 
          trend: `${revenueTrendValue}%`,
          trendPositive: revenueTrendValue >= 0
        },
        { 
          title: "Active Buyers", 
          value: activeBuyers.toString(), 
          icon: <FiUsers />, 
          trend: `${buyersTrendValue}%`,
          trendPositive: buyersTrendValue >= 0
        },
        { 
          title: "Conversion Rate", 
          value: `${conversionRate}%`, 
          icon: <FiTrendingUp />, 
          trend: `${conversionTrendValue}%`,
          trendPositive: conversionTrendValue >= 0
        },
      ]);

      // Prepare recent activities
      const activities = userRequests
        .sort((a, b) => (b.requestId || '').localeCompare(a.requestId || ''))
        .slice(0, 5)
        .map(req => ({
          id: req.id || 0,
          action: req.status === RequestStutus.Completed 
            ? `Land #${req.landId} sold to ${req.buyerName || 'buyer'}` 
            : req.status === RequestStutus.Requested 
              ? `New request for Land #${req.landId} from ${req.buyerName || 'buyer'}`
              : `Request for Land #${req.landId} was ${req.status}`,
          time: req.postDate ? formatDistanceToNow(new Date(req.postDate), { addSuffix: true }) : "Recently",
          status: req.status === RequestStutus.Completed ? 'completed' as const : 
                 req.status === RequestStutus.Rejected ? 'rejected' as const : 'pending' as const
        }));
        
      setRecentActivities(activities);

    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center min-h-[93vh]">
          <Loader />
        </div>
      </SellerLayout>
    );
  }

  if (error) {
    return (
      <SellerLayout>
        <div className="p-4 sm:p-6 min-h-[93vh] bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                <FiAlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle className="text-xl">Error Loading Dashboard</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={fetchDashboardData}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </SellerLayout>
    );
  }


  return (
    <SellerLayout>
      <div className="p-4 sm:p-6 min-h-[93vh] bg-gray-50">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {currentUser?.fullName}! Here's your overview.
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <Select 
              value={timeRange}
              onChange={(event) => setTimeRange(event.target.value as '7d' | '30d' | '90d')}
            >
              <SelectTrigger className="w-[180px]">
                <FiCalendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem data-value="7d">Last 7 days</SelectItem>
                <SelectItem data-value="30d">Last 30 days</SelectItem>
                <SelectItem data-value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="h-6 w-6 text-muted-foreground">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs mt-2 flex items-center ${
                  stat.trendPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  <FiTrendingUp className={`mr-1 h-3 w-3 ${
                    !stat.trendPositive && 'transform rotate-180'
                  }`} />
                  {stat.trend} {stat.trendPositive ? 'increase' : 'decrease'} from last period
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Listings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  labels={getMonthLabels()}
                  data={landsByMonth}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className={`p-2 rounded-full mr-3 mt-1 ${
                          activity.status === 'completed' ? 'bg-green-50 text-green-600' :
                          activity.status === 'rejected' ? 'bg-red-50 text-red-600' :
                          'bg-yellow-50 text-yellow-600'
                        }`}>
                          {activity.status === 'completed' ? (
                            <FiCheckCircle className="h-4 w-4" />
                          ) : activity.status === 'rejected' ? (
                            <FiAlertCircle className="h-4 w-4" />
                          ) : (
                            <FiClock className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiActivity className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-gray-500">No recent activities</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/p_seller/CreateLandPage")}
                >
                  <FiPlus className="mr-2 h-4 w-4" />
                  Add New Listing
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/p_seller/PaymentCenter')}
                >
                  <FiDollarSign className="mr-2 h-4 w-4" />
                  View Transactions
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/p_seller/ManageLand')}
                >
                  <FiList className="mr-2 h-4 w-4" />
                  Manage Listings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Performance Summary</CardTitle>
                  <Badge variant="outline">
                    {timeRange === '7d' ? 'Last 7 days' : 
                     timeRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Listing Views</span>
                    <span className="font-medium">
                      {Math.floor(lands.length * 12.5)}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Avg. Response Time</span>
                    <span className="font-medium">
                      {requests.length > 0 ? '2.4 hrs' : 'N/A'}
                    </span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Customer Rating</span>
                    <span className="font-medium">
                      {requests.filter(req => req.status === RequestStutus.Completed).length > 0 ? '4.8/5' : 'N/A'}
                    </span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Listings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Listings</CardTitle>
              </CardHeader>
              <CardContent>
                {lands.length > 0 ? (
                  <div className="space-y-4">
                    {lands.slice(0, 3).map(land => (
                      <div key={land.id} className="flex items-center">
                        <div className="bg-gray-100 rounded-md h-10 w-10 flex items-center justify-center mr-3 overflow-hidden">
                          {land.documentHash ? (
                            <img 
                              src={land.documentHash} 
                              alt={land.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FiMap className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{land.title}</p>
                          <p className="text-gray-500 text-xs">${land.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <FiActivity className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">No listings yet</p>
                  </div>
                )}
              </CardContent>
              {lands.length > 3 && (
                <CardFooter>
                  <Button 
                    variant="ghost"
                    className="w-full"
                    onClick={() => router.push('/p_seller/ManageLand')}
                  >
                    View all listings
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;