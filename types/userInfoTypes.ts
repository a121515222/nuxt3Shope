export interface UserInfoDataType {
  email: string;
  password: string;
  confirmPassword: string;
  birthday: number | Date | string;
  tel: string;
  address: string;
  gender: "male" | "female" | null;
  username: string;
  id: string;
}
export interface userInfoUpdateDataType extends UserInfoDataType {
  newPassword: string;
}
interface UserInfoGetDataType {
  email: string;
  birthday: number | Date | string;
  tel: string;
  address: string;
  gender: "male" | "female" | null;
  username: string;
}
export interface UserInfoDataResponse {
  data: UserInfoGetDataType;
  message: string;
  status: boolean;
}
