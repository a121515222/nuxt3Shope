export interface SignInDataType {
  email: string;
  password: string;
  confirmPassword: string;
  gender: string | null;
  username: string;
  birthday: number | Date | string;
  tel: string;
  address: string;
}
export interface SignInResponseType {
  status: boolean;
  message: string;
  data: {
    info: string;
  };
}
