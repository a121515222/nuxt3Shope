import {
  nameValidatePattern,
  emailValidatePattern,
  telValidatePattern,
  addressValidatePattern,
  passwordValidatePattern,
  noBlankValidatePattern
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
    return confirmPassword === password;
  };
  const noBlankRule = (data: string | number) => {
    return noBlankValidatePattern.test(String(data));
  };

  const nameValidateRuleConfig = (data: string | number) => {
    return {
      noBlank: {
        fn: () => noBlankRule(data),
        errorMessage: "姓名不能包含空白"
      },
      sevenNumberOneLetter: {
        fn: () => nameRule(data),
        errorMessage: "只能輸入英文或中文"
      }
    };
  };
  const emailValidateRuleConfig = (data: string | number) => {
    return {
      noBlankRule: {
        fn: () => noBlankRule(data),
        errorMessage: "電子郵件格式不能包含空白"
      },
      email: {
        fn: () => emailRule(data),
        errorMessage: "請輸入正確的電子郵件格式"
      }
    };
  };
  const telValidateRuleConfig = (data: string | number) => {
    return {
      noBlankRule: {
        fn: () => noBlankRule(data),
        errorMessage: "電話不能包含空白"
      },
      tel: {
        fn: () => telRule(data),
        errorMessage: "請輸入正確的電話號碼格式"
      }
    };
  };
  const addressValidateRuleConfig = (data: string | number) => {
    return {
      noBlankRule: {
        fn: () => noBlankRule(data),
        errorMessage: "地址不能包含空白"
      },
      address: {
        fn: () => addressRule(data),
        errorMessage: "請輸入正確的地址格式"
      }
    };
  };
  const passwordValidateRuleConfig = (data: string | number) => {
    return {
      password: {
        fn: () => passwordRule(data),
        errorMessage: "至少一個字母和至少7個數字"
      },
      noBlankRule: {
        fn: () => noBlankRule(data),
        errorMessage: "密碼不能包含空白"
      }
    };
  };
  const confirmPasswordValidateRuleConfig = (
    confirmPassword: string | number,
    password: string | number
  ) => {
    return {
      confirmPassword: {
        fn: () => confirmPasswordRule(confirmPassword, password),
        errorMessage: "請輸入相同的密碼"
      },
      noBlankRule: {
        fn: () => noBlankRule(confirmPassword),
        errorMessage: "確認密碼不能包含空白"
      }
    };
  };
  const nameValidate = async (
    name: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(nameValidateRuleConfig(name), errorMessageRef, inputRef);
      return result;
    } catch (error) {
      console.warn("姓名驗證失敗", error);
      return false;
    }
  };

  const emailValidate = async (
    email: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(emailValidateRuleConfig(email), errorMessageRef, inputRef);
      return result;
    } catch (error) {
      console.warn("電子郵件驗證失敗", error);
      return false;
    }
  };

  const telValidate = async (
    tel: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(telValidateRuleConfig(tel), errorMessageRef, inputRef);
      return result;
    } catch (error) {
      console.warn("電話號碼驗證失敗", error);
      return false;
    }
  };

  const addressValidate = async (
    address: string,
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      const result = await validateInput(
        addressValidateRuleConfig(address),
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
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null,
    isAllowBlank: boolean = false
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      console.warn("errorMessageRef 或 inputRef 為 null");
      return Promise.resolve(false);
    }
    try {
      if (isAllowBlank && password === "") {
        return true;
      }
      const result = await validateInput(
        passwordValidateRuleConfig(password),
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
    errorMessageRef: HTMLParagraphElement | null,
    inputRef: HTMLInputElement | null,
    isAllowBlank: boolean = false
  ): Promise<boolean> => {
    if (errorMessageRef === null || inputRef === null) {
      return Promise.resolve(false);
    }
    try {
      if (isAllowBlank && password === "" && confirmPassword === "") {
        return true;
      }
      const result = await validateInput(
        confirmPasswordValidateRuleConfig(confirmPassword, password),
        errorMessageRef,
        inputRef
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
