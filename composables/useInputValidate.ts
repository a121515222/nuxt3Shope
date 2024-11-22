import type { RuleConfig } from "@/types/validateInputType";
export function useInputValidate() {
  const handleInputStopTextValidate = (event: Event, callback: () => void) => {
    const target = event.target as HTMLInputElement;
    if (target) {
      callback();
    }
  };
  const validateInput = (
    ruleConfig: RuleConfig,
    errorMessageRef: HTMLParagraphElement,
    inputRef?: HTMLInputElement
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      // 如果沒有規則配置，默認通過驗證
      if (!ruleConfig) {
        resetValidationMessage(errorMessageRef);
        if (inputRef) {
          resetValidationInputStyle(inputRef);
        }
        resolve(true);
        return;
      }

      // 遍历规则配置，逐一验证
      for (const key in ruleConfig) {
        const rule = ruleConfig[key];
        // 调用 `fn`，不需要额外显式传入 `extraArgs`
        if (!rule.fn()) {
          // 如果规则不通过，显示错误信息并返回失败
          errorMessageRef.textContent = rule.errorMessage;
          addValidationMessage(errorMessageRef);
          if (inputRef) {
            addValidationInputStyle(inputRef);
          }
          reject(false);
          return;
        }
      }

      // 如果所有規則通過，清空錯誤訊息並返回成功
      resetValidationMessage(errorMessageRef);
      if (inputRef) {
        resetValidationInputStyle(inputRef);
      }
      resolve(true);
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
    handleInputStopTextValidate,
    validateAllInputs,
    addValidationMessage,
    resetValidationMessage,
    resetValidationInputStyle
  };
}
