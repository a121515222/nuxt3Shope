export interface UserInfoDataType {
  email: string;
  password: string;
  confirmPassword: string;
  birthday: number | Date | string;
  tel: string;
  address: string;
  gender: "male" | "female" | null;
  username: string;
}
