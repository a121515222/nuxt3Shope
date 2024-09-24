export function useInputValidate() {
  const validateInput = (
    rule: (data: string | number) => boolean,
    data: string,
    errorMessageToDisplays: string,
    errorMessageRef: HTMLParagraphElement
  ) => {
    if (!rule(data)) {
      errorMessageRef.textContent = errorMessageToDisplays;
      addValidationStyle(errorMessageRef);
      return false;
    } else {
      resetValidationStyle(errorMessageRef);
      return true;
    }
  };
  const addValidationStyle = (ref: HTMLElement) => {
    ref.classList.remove("opacity-0");
  };

  const resetValidationStyle = (ref: HTMLElement) => {
    ref.classList.add("opacity-0");
  };
  return {
    validateInput,
    addValidationStyle,
    resetValidationStyle
  };
}
