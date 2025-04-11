export interface buttonCallback<T> {
  inputValue: T;
}

export interface CustomFormFieldProps {
  LableName: string;
  placeholder: string;
  inputType: any;
  isTextArea: boolean;
  value: string;
  handleChange: any;
}

export interface CustomButtonProps {
  title: string;
  buttonType: any;
  styles?: string;
  handleClick?: any;
  disabled?: boolean;
}

export interface Window {
  ethereum: any;
}

export interface NavLinkModel {
  name: string;
  link: string;
  linkName?: string;
  icon?: any;
  styles?: string;
  disabled?: boolean;
  handleClick?: any;
  isActive?: any;
}
export interface Land {
  id: number;
  documentHash: string;
  price: number;
  locationAddress: string;
  postedBy: string;
  detail: string;
  postedDate: number;
  isVerified: boolean;
}

export interface SideBarModel {
  styles?: string;
  name?: any;
  imgUrl?: string;
  isActive?: boolean;
  disabled?: boolean;
  handleClick?: any;
}
export const parseLandData = (data: any): Land => {
  return {
    id: data["0"].toNumber(),
    documentHash: data["1"],
    price: data["2"].toNumber(),
    locationAddress: data["3"],
    postedBy: data["4"],
    detail: data["5"],
    postedDate: data["6"].toNumber(),
    isVerified: data["7"],
  };
};

export interface Transaction {
  id: string;
  amount: number;
  from: string;
  to: string;
}
