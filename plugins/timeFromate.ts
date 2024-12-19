import dayjs from "dayjs";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("timeFormat", {
    mounted(el, binding) {
      const time = dayjs(binding.value).format("YYYY-MM-DD");
      el.innerHTML = time;
    },
    updated(el, binding) {
      const time = dayjs(binding.value).format("YYYY-MM-DD");
      el.innerHTML = time;
    }
  });
});
