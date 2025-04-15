enum Status {
  Sucessful = 200,
  ServerError = 500,
  ClientError = 400,
}

export interface ErrorMessage {
  code: Status;
  message: string;
}

export interface ContractWriteResponse {
  status: boolean;
  data?: any;
}

export interface ValueResponse {
  cid: string;
  created: string;
  deals: [];
  files: [];
  name: string;
  pin: {};
  scope: string;
  size: number;
  type: string;
}

export interface NftResponse<T> {
  ok: boolean;
  value?: T;
}

export interface ApiResponse<T = void> {
  isSuccess: boolean;
  message: string | null;
  code: Status;
  data?: T;
}
