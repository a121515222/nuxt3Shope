import dayjs from "dayjs";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("timeFormat", {
    mounted(el, binding) {
      formatAndDisplayDate(el, binding);
    },
    updated(el, binding) {
      formatAndDisplayDate(el, binding);
    }
  });
});
function formatAndDisplayDate(
  el: HTMLElement,
  binding: { value: string | Date | null | undefined | number }
) {
  if (binding.value === null || binding.value === undefined || binding.value === "") {
    el.innerHTML = "";
  } else {
    const time = dayjs(binding.value).format("YYYY-MM-DD");
    el.innerHTML = time;
  }
}
