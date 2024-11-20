export function useInputValidate() {
  const validateInput = (
    rule: (data: string | number) => boolean,
    data: string,
    errorMessageToDisplays: string,
    errorMessageRef: HTMLParagraphElement,
    inputRef?: HTMLInputElement,
    extraRule?: () => boolean
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      console.log("extraRule", extraRule?.());
      const extraRuleResult = typeof extraRule?.() === "undefined" ? true : extraRule();
      if (rule(data) && extraRuleResult) {
        resetValidationMessage(errorMessageRef);
        if (inputRef) {
          resetValidationInputStyle(inputRef);
        }
        resolve(true);
      } else {
        errorMessageRef.textContent = errorMessageToDisplays;
        addValidationMessage(errorMessageRef);
        if (inputRef) {
          addValidationInputStyle(inputRef);
        }
        reject(false);
      }
    });
  };
  const addValidationMessage = (ref: HTMLElement) => {
    ref.classList.remove("opacity-0");
  };

  const resetValidationMessage = (ref: HTMLElement) => {
    ref.classList.add("opacity-0");
  };
  const addValidationInputStyle = (ref: HTMLElement) => {
    ref.classList.add("border-red-500", "bg-red-500", "focus:ring-red-500");
  };
  const resetValidationInputStyle = (ref: HTMLElement) => {
    ref.classList.remove("border-red-500", "bg-red-500", "focus:ring-red-500");
  };
  const validateAllInputs = async function (validations: Array<() => Promise<boolean>>) {
    // 使用 Promise.all 動態執行 validations 陣列中的所有驗證函數
    const results = await Promise.all(validations.map((validation) => validation()));

    // 檢查結果是否全部為 true
    const allValid = results.every((result) => result === true);

    return allValid;
  };
  return {
    validateInput,
    validateAllInputs,
    addValidationMessage,
    resetValidationMessage,
    resetValidationInputStyle
  };
}
