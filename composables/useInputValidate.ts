export function useInputValidate() {
  const inputValidate = ref(false);
  const validateInput = (value: string) => {
    if (value.length > 0) {
      inputValidate.value = true;
    } else {
      inputValidate.value = false;
    }
  };
  return {
    inputValidate,
    validateInput
  };
}
