import { Transaction } from "@/lib/models/commonModels";
import { BiBookAlt } from "react-icons/bi";

type Props = {
  recentTransactions: Transaction[];
};
const RecentTransations = ({ recentTransactions }: Props) => {
  const names = ["John Doe", "Jane Doe", "some one", "Me"];
  return (
    <div className="w-full  p-2 shadow-md">
      <h1 className="font-bold">Recent Transations</h1>
      <div className="pt-6 ">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                Transaction ID
              </th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                Amount
              </th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                Seller
              </th>
              <th className="py-3 px-6 bg-gray-100 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                Buyer
              </th>
            </tr>
          </thead>
          <tbody>
            {names.map((name, index) => (
              <tr key={index}>
                <td className="py-4 px-6 text-center border-b border-gray-200">
                  <div className="flex gap-2 justify-center items-center">
                    <BiBookAlt color="green" />
                    <span> TX001</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center border-b border-gray-200">
                  $50.00
                </td>
                <td className="py-4 px- text-center border-b border-gray-200">
                  {name}
                </td>
                <td className="py-4 px-6 text-center border-b border-gray-200">
                  Jane Smith
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransations;
