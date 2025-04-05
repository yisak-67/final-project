import React from "react";
type Props = {
  height?: string;
};
const Loader = ({ height = "h-screen" }: Props) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-10 ${height} bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col`}
      >
        <img
          src="/images/svg/loadersvg.svg"
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
        <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
          Please wait...
        </p>
      </div>
    </>
  );
};

export default Loader;
