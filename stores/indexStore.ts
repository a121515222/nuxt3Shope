import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const testData = ref("Hello, Pinia!");
  const headerHeight = ref(0);
  const footerHeight = ref(0);
  const scrollY = ref(0);
  const isDarkMode = ref(false);
  const isShowAlert = ref(false);
  const isMainBannerIntersection = ref(false);
  const windowHeight = ref(0);
  const shouldShowDarkMode = (): string => {
    return isDarkMode
      ? scrollY.value >= 50
        ? "bg-secondary-dark text-primary-dark"
        : "bg-primary-dark text-secondary-dark"
      : scrollY.value >= 50
        ? "bg-secondary text-primary"
        : "bg-primary text-secondary";
  };
  const shouldShowDarkModeText = (): string => {
    return isDarkMode
      ? scrollY.value >= 50
        ? "text-primary-dark"
        : "text-secondary-dark"
      : scrollY.value >= 50
        ? "text-primary"
        : "text-secondary";
  };
  const shouldShowDarkModeBackground = (): string => {
    return isDarkMode
      ? scrollY.value >= 50
        ? "bg-secondary-dark"
        : "bg-primary-dark"
      : scrollY.value >= 50
        ? "bg-secondary"
        : "bg-primary";
  };
  const windowHeightListener = (): void => {
    windowHeight.value = window.innerHeight;
    window.addEventListener("resize", () => {
      windowHeight.value = window.innerHeight;
    });
  };
  const removeWindowHeightListener = (): void => {
    window.removeEventListener("resize", () => {
      windowHeight.value = window.innerHeight;
    });
  };
  return {
    testData,
    isDarkMode,
    headerHeight,
    footerHeight,
    windowHeight,
    scrollY,
    isMainBannerIntersection,
    isShowAlert,
    shouldShowDarkMode,
    shouldShowDarkModeText,
    shouldShowDarkModeBackground,
    windowHeightListener,
    removeWindowHeightListener
  };
});
