import {
  nameValidatePattern,
  emailValidatePattern,
  telValidatePattern,
  addressValidatePattern,
  passwordValidatePattern
} from "@/utils/validatePattern";
const { validateInput } = useInputValidate();
export function useFormValidate() {
  const nameRule = (data: string | number) => {
    return nameValidatePattern.test(String(data));
  };
  const emailRule = (data: string | number) => {
    return emailValidatePattern.test(String(data));
  };
  const telRule = (data: string | number) => {
    return telValidatePattern.test(String(data));
  };
  const addressRule = (data: string | number) => {
    return addressValidatePattern.test(String(data));
  };
  const passwordRule = (data: string | number) => {
    return passwordValidatePattern.test(String(data));
  };
  const confirmPasswordRule = (confirmPassword: string | number, password: string | number) => {
    console.log("confirmPassword === password", confirmPassword === password);
    return confirmPassword === password;
  };

  const nameValidate = async (
    name: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        nameRule,
        name,
        (errorMessage = "只能輸入英文或中文"),
        errorMessageRef,
        inputRef
      );
      return result;
    } catch (error) {
      console.warn("姓名驗證失敗", error);
      return false;
    }
  };

  const emailValidate = async (
    email: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        emailRule,
        email,
        (errorMessage = "請輸入正確的電子郵件格式"),
        errorMessageRef,
        inputRef
      );
      return result;
    } catch (error) {
      console.warn("電子郵件驗證失敗", error);
      return false;
    }
  };

  const telValidate = async (
    tel: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        telRule,
        tel,
        (errorMessage = "請輸入正確的電話號碼格式"),
        errorMessageRef,
        inputRef
      );
      return result;
    } catch (error) {
      console.warn("電話號碼驗證失敗", error);
      return false;
    }
  };

  const addressValidate = async (
    address: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        addressRule,
        address,
        (errorMessage = "請輸入正確的地址格式"),
        errorMessageRef,
        inputRef
      );
      return result;
    } catch (error) {
      console.warn("地址驗證失敗", error);
      return false;
    }
  };
  const passwordValidate = async (
    password: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        passwordRule,
        password,
        (errorMessage = "至少一個字母和至少7個數字"),
        errorMessageRef,
        inputRef
      );
      return result;
    } catch (error) {
      console.warn("密碼驗證失敗", error);
      return false;
    }
  };
  const confirmPasswordValidate = async (
    confirmPassword: string,
    password: string,
    errorMessage: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        passwordRule,
        confirmPassword,
        (errorMessage = "請輸入相同的密碼"),
        errorMessageRef,
        inputRef,
        () => confirmPasswordRule(confirmPassword, password)
      );
      return result;
    } catch (error) {
      console.warn("確認密碼驗證失敗", error);
      return false;
    }
  };
  return {
    nameValidate,
    emailValidate,
    telValidate,
    addressValidate,
    passwordValidate,
    confirmPasswordValidate
  };
}
