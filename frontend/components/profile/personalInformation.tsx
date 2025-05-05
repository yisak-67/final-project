import React, { useState, useEffect } from "react";
import { FaAngleRight, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/appstate";

import { updateProfileWithContract } from "@/lib/services/blockchainService/authcontractServices";
import { AuthSelector, setUser } from "@/lib/appstate/features/auth";

interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
  addressLocation: string;
  profileHash: string;
  email: string;
  password: string;
}

const PersonalInformation: React.FC = () => {
  const { user } = useAppSelector(AuthSelector);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    fullName: "",
    phoneNumber: "",
    addressLocation: "",
    profileHash: "",
    email: "",
    password: ""
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullName ?? "",
        phoneNumber: user.phoneNumber ?? "",
        addressLocation: user.addressLocation ?? "",
        profileHash: user.profileHash ?? "",
        email: user.email ?? "",
        password: user.password ?? ""
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await updateProfileWithContract ({
        profileHash: profileData.profileHash,
        
        fullName:profileData.fullName,
        email: profileData.email,
        password: profileData.password,
        addressLocation: profileData.addressLocation,
        phoneNumber: profileData.phoneNumber
      });

      if (response.status) {
        setSuccess("Profile updated successfully!");
        setIsEditing(false);
        // Update global state with new user data
        dispatch(setUser({ ...user, ...profileData }));
      } else {
        setError(response.data || "Failed to update profile");
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldsToDisplay = [
    { id: "fullName", label: "Full Name", editable: true },
    { id: "email", label: "Email", editable: false },
    { id: "phoneNumber", label: "Phone Number", editable: true },
    { id: "addressLocation", label: "Address", editable: true }
  ];

  return (
    <div className="profile-container bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="profile-header flex items-center mb-8">
        <div className="profile-avatar relative">
          <img
            src={profileData.profileHash || "/images/placeholderImage.jpg"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
          />
          {isEditing && (
            <button type="button" title="Edit Profile Picture" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <FaEdit size={12} />
            </button>
          )}
        </div>
        <div className="profile-title ml-4">
          <h1 className="text-2xl font-bold text-gray-800">Personal Information</h1>
          <p className="text-gray-500">Manage your account details</p>
        </div>
      </div>

      {error && (
        <div className="alert-error mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="alert-success mb-6 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <div className="profile-content">
        <div className="section-title uppercase text-xs font-bold text-gray-400 mb-2">
          Account Details
        </div>
        <hr className="border-gray-200 mb-6" />

        <div className="profile-fields space-y-4">
          {fieldsToDisplay.map(field => (
            <div key={field.id} className="field-group flex items-center py-3">
              <label className="field-label w-1/4 font-medium text-gray-700">
                {field.label}
              </label>
              <div className="field-value flex-1 flex items-center">
                {isEditing && field.editable ? (
                  <input
                    type={field.id === "phoneNumber" ? "tel" : "text"}
                    id={field.id}
                    value={profileData[field.id as keyof ProfileFormData]}
                    onChange={handleChange}
                    className="field-input flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!field.editable || isLoading}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    title={field.label}
                  />
                ) : (
                  <span className="field-display flex-1 text-gray-800">
                    {profileData[field.id as keyof ProfileFormData] || "Not set"}
                  </span>
                )}
                
                {field.editable && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="edit-button ml-3 text-gray-400 hover:text-blue-500 transition-colors"
                    disabled={isLoading}
                  >
                    {isEditing ? <FaTimes size={16} /> : <FaEdit size={16} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="action-buttons flex justify-end mt-8 space-x-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setError(null);
              }}
              className="cancel-button px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="save-button px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  <FaCheck className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 800px;
        }
        .profile-avatar {
          width: 64px;
          height: 64px;
        }
        .field-group {
          min-height: 50px;
        }
        .field-input:disabled {
          background-color: #f3f4f6;
          cursor: not-allowed;
        }
        .edit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .save-button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default PersonalInformation;