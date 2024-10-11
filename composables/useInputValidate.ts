export function useInputValidate() {
  const validateInput = (
    rule: (data: string | number) => boolean,
    data: string,
    errorMessageToDisplays: string,
    errorMessageRef: HTMLParagraphElement,
    inputRef?: HTMLInputElement
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!rule(data)) {
        errorMessageRef.textContent = errorMessageToDisplays;
        addValidationMessage(errorMessageRef);
        if (inputRef) {
          addValidationInputStyle(inputRef);
        }
        reject(false);
      } else {
        resetValidationMessage(errorMessageRef);
        if (inputRef) {
          resetValidationInputStyle(inputRef);
        }
        resolve(true);
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
    ref.classList.add("border-red-500", "bg-red-50", "focus:ring-red-500");
  };
  const resetValidationInputStyle = (ref: HTMLElement) => {
    ref.classList.remove("border-red-500", "bg-red-50", "focus:ring-red-500");
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
    resetValidationMessage
  };
}
