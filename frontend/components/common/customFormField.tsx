import { CustomFormFieldProps } from "@/lib/models/commonModels";

const CustomFormField = (Props: CustomFormFieldProps) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {Props.LableName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#02131E] mb-[10px]">
          {Props.LableName}
        </span>
      )}

      {Props.isTextArea ? (
        <textarea
          required
          value={Props.value}
          onChange={Props.handleChange}
          rows={10}
          placeholder={Props.placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#02131E]
        text-[14px]  rounded-[10px]  placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={Props.value}
          onChange={Props.handleChange}
          type={Props.inputType}
          step="0.1"
          placeholder={Props.placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#cacad5] bg-transparent font-epilogue text-[#02131E]
          text-[14px]  rounded-[10px]  placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default CustomFormField;
