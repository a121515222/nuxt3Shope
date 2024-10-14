export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  uid: string;
  token: string;
  expired: number;
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
