import React from "react";
import Modal from "@/components/common/modal";
import { updateProfileWithContract } from "@/lib/services/blockchainService/authcontractServices";
import { ContractWriteResponse } from "@/lib/models/responseMessage";
import { User } from "@/lib/models/auth";

interface UpdateModalProps {
  onClose: () => void;
  user: User | null;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ onClose, user }) => {
  const [profileData, setProfileData] = React.useState({
    fullName: user?.fullName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
    address: user?.addressLocation ?? "",
    dateOfBirth: "January 1, 1990", // Replace with actual date of birth if available
  });
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response: ContractWriteResponse = await updateProfileWithContract(profileData);
      if (response.status) {
        setMessage("Profile updated successfully!");
        setTimeout(() => {
          onClose(); // Close the modal after a short delay
        }, 1500); // 1.5 seconds delay
      } else {
        setMessage(`Error: ${response.data}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false); // Re-enable the button
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="bg-white rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        {message && (
          <div className={`mb-4 p-2 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <div className="mb-4">
                <label htmlFor="fullName" className="block font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Update Full Name"
                  value={profileData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Update Phone Number"
                  value={profileData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <div className="mb-4">
                <label htmlFor="address" className="block font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Update Address"
                  value={profileData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block font-medium mb-1">
                  Date of Birth
                </label>
                <input
                  type="text"
                  id="dateOfBirth"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  placeholder="Update Date of Birth"
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              disabled={loading} // Disabled when loading is true
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateModal;