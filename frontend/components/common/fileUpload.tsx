import React, { useState } from "react";
import { uploadFileWithPinata } from "@/lib/services/ipfsStorage/storageService";
import CustomButton from "./customButton";
import { useAppDispatch } from "@/lib/appstate";
import {
  setFilePath,
  setShowFileUpload,
} from "@/lib/appstate/features/land/actions";
import { AiOutlineLeft } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useAppDispatch();

  const retrieveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    if (file) {
      const pathResult = await uploadFileWithPinata(file);
      if (typeof pathResult === "string") {
        dispatch(setFilePath(pathResult));
        setPath(pathResult);
        console.log(pathResult);
      } else {
        console.error("Upload failed:", pathResult?.message);
      }
    }
    setIsUploading(false);
  };

  return (
    <div className="fixed right-0 top-0 z-[1000] h-full w-full sm:w-[500px] md:w-[600px] lg:w-[800px] bg-[#082232] border-gray-100 shadow ring-1 ring-gray-50 text-white transition duration-400 ease-in-out rounded-tl-[25px] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-start items-start">
      {/* Close Button */}
      <div className="w-full flex justify-start items-center mb-6">
        <button
          className="mt-1 focus:outline-none"
          onClick={() => dispatch(setShowFileUpload(false))}
          title="Close"
          aria-label="Close"
        >
          <AiOutlineLeft className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl" size={30} />
        </button>
      </div>

      {/* Image Preview */}
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="rounded-[15px] sm:rounded-[20px] md:rounded-[25px] lg:rounded-[35px] overflow-hidden shadow-md">
          <img
            src={`${path ?? "/images/placeholderImage.jpg"}`}
            alt="Uploaded File Preview"
            className="block w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px]"
          />
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 w-full flex flex-col sm:flex-row justify-around items-center gap-4"
        >
          <label htmlFor="fileInput" className="block font-medium text-sm sm:text-base md:text-lg lg:text-xl text-white">
            Select File:
          </label>
          <input
            type="file"
            id="fileInput"
            className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            onChange={retrieveFile}
          />
          <CustomButton
            buttonType="submit"
            title="Upload"
            styles="px-4 py-2 text-white bg-[#4eac6f] rounded-md hover:bg-[#3d8a58] focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            disabled={isUploading || !file}
          />
        </form>

        {/* Uploading Spinner */}
        {isUploading && (
          <div className="mt-8 flex justify-center items-center">
            <FaSpinner size={40} className="animate-spin" />
            <span className="ml-2 text-lg">Uploading...</span>
          </div>
        )}

        {!isUploading && path && (
          <div className="mt-8 text-center">
            <p className="text-green-400 text-sm sm:text-base">File uploaded successfully!</p>
            <p className="text-gray-400 text-xs sm:text-sm break-words">Path: {path}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;