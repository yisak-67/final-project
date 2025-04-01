// import React, { useState } from "react";
// import { uploadFileWithnftStorage } from "@/lib/services/ipfsStorage/storageService";
// import CustomButton from "./customButton";
// import { useAppDispatch } from "@/lib/appstate";
// import {
//   setFilePath,
//   setShowFileUpload,
// } from "@/lib/appstate/features/land/actions";
// import { AiOutlineLeft } from "react-icons/ai";
// import { FaSpinner } from "react-icons/fa";

// const FileUpload = () => {
//   const [file, setFile] = useState();
//   const [path, setPath] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const dispatch = useAppDispatch();

//   const retrieveFile = (e: any) => {
//     e.preventDefault();
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsUploading(true);

//     if (file) {
//       const pathResult = await uploadFileWithnftStorage(file);
//       dispatch(setFilePath(pathResult as string));
//       setPath(pathResult as string);
//     }
//     setIsUploading(false);
//   };

//   //#bg-[#082232]

//   return (
//     <div className="w-[800px] h-full bg-[#082232]  border-gray-100 shadow ring-1 ring-gray-50  fixed right-0 top-0 p-6 z-[1000] text-white rounded-tl-[25px]  transition duration-400 ease-in-out    ">
//       <div className="flex flex-col  justify-start items-start gap-[#100px]">
//         <button
//           className="mt-1  "
//           onClick={() => dispatch(setShowFileUpload(false))}
//         >
//           <AiOutlineLeft className="text-white" size={30} />
//         </button>
//       </div>
//       <div>
//         <div className=" mt-10 flex justify-center items-center">
//           <img
//             src={`${path ?? "/images/placeholderImage.jpg"}`}
//             alt={""}
//             className="rounded-[#35px]"
//             height={400}
//             width={400}
//           />
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="mt-10 flex flex-row justify-around items-center"
//         >
//           <label className="block font-medium text-white">Select a file:</label>

//           <input
//             type="file"
//             id="fileInput"
//             className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             onChange={retrieveFile}
//           />
//           <CustomButton
//             buttonType="submit"
//             title="Upload File"
//             styles="px-4 py-2 text-white bg-[#4eac6f] rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500 "
//           />
//         </form>
//       </div>

//       <div className="flex justify-center items-center">
//         {isUploading && <FaSpinner size={50} className="mt-10" />}
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
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
        console.error("Upload failed:", pathResult.message);
      }
    }
    setIsUploading(false);
  };

  return (
    <div className="w-[800px] h-full bg-[#082232] border-gray-100 shadow ring-1 ring-gray-50 fixed right-0 top-0 p-6 z-[1000] text-white rounded-tl-[25px] transition duration-400 ease-in-out">
      <div className="flex flex-col justify-start items-start gap-[100px]">
        <button
          className="mt-1"
          onClick={() => dispatch(setShowFileUpload(false))}
        >
          <AiOutlineLeft className="text-white" size={30} />
        </button>
      </div>
      <div>
        <div className="mt-10 flex justify-center items-center">
          <img
            src={`${path ?? "/images/placeholderImage.jpg"}`}
            alt={""}
            className="rounded-[35px]"
            height={400}
            width={400}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-row justify-around items-center"
        >
          <label className="block font-medium text-white">Select a file:</label>
          <input
            type="file"
            id="fileInput"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={retrieveFile}
          />
          <CustomButton
            buttonType="submit"
            title="Upload File"
            styles="px-4 py-2 text-white bg-[#4eac6f] rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500"
          />
        </form>
      </div>

      <div className="flex justify-center items-center">
        {isUploading && <FaSpinner size={50} className="mt-10 animate-spin" />}
      </div>
    </div>
  );
};

export default FileUpload;