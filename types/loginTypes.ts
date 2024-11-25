export interface UserLogin {
  account: string;
  password: string;
}

export interface UserLoginResponse {
  status: boolean;
  message: string;
  data: {
    birthday: number;
    email: string;
    gender: string;
    name: string;
    rank: string;
    token: string;
    userId: string;
  };
}

export interface CheckTokenResponse {
  success: boolean;
  message?: string;
  uid?: string;
}
export interface LogOutResponse {
  success: boolean;
  uid: string;
}
