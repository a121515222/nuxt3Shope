export interface ForgetPasswordType {
  password: string;
  confirmPassword: string;
  token: string;
  id: string;
}

export interface ForgetPasswordResponse {
  status: boolean;
  message: string;
}
