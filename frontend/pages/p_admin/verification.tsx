import Layout from "@/components/admin/layout";
import UnverifiedLands from "@/components/admin/unverifiedLands";
import Users from "@/components/admin/users";
import { useState } from "react";

const Tabs: React.FC = () => {
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
          Verify Lands
        </button>

        <div className="absolute  top-0 bottom-0 border-r border-white/20"></div>

        <button
          onClick={() => setActiveTab(1)}
          className={`w-1/2 py-4 px-1 text-center border-b-4 ${
            activeTab === 1 ? "border-gray-300" : "border-transparent"
          } text-sm font-medium text-black transition-all duration-200 ease-in-out`}
        >
          Verify Users
        </button>
      </nav>
      <div className="w-full">
        {activeTab === 0 && (
          <div className="p-6">
            <UnverifiedLands />
          </div>
        )}
        {activeTab === 1 && (
          <div className="p-6">
            <Users />
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Layout>
      <div className="md:ml-[270px]  h-full">
        <Tabs />
      </div>
    </Layout>
  );
}
