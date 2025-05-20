import React from "react";
import { buttonCallback, CustomButtonProps } from "@/lib/models/commonModels";
const CustomButton = (Props: CustomButtonProps) => {
  return (
    <button
      disabled={Props.disabled}
      type={Props.buttonType}
      onClick={Props.handleClick}
      className={`font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[42px] px-4 rounded-[10px] ${Props.styles}`}
    >
      {Props.title}
    </button>
  );
};

export default CustomButton;