export function useInterSectionObserver() {
  const isIntersecting = ref(false);
  const elRef = ref<HTMLElement | null>(null);
  const observer = ref<IntersectionObserver | null>(null);
  const interSectionObserver = (
    el: HTMLElement | null,
    options = {
      root: null,
      threshold: 0
    }
  ) => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting;
      });
    }, options);
    elRef.value = el;
    if (el) {
      observer.value.observe(el);
    }
  };
  const unObserver = () => {
    if (observer.value) {
      observer.value.disconnect();
      observer.value = null;
    }
    elRef.value = null;
  };
  onUnmounted(() => {
    unObserver();
  });
  return { isIntersecting, elRef, observer, interSectionObserver };
}
