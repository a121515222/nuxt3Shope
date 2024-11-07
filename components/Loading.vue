<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-50 flex justify-center items-center bg-gray-200/30 dark:bg-gray-700/30"
  >
    <div
      class="loader-box flex justify-center items-center w-56 h-48 shadow-lg rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      <div class="loader text-[40px] font-bold uppercase text-transparent">Loading</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const indexStore = useIndexStore();
const { isLoading } = storeToRefs(indexStore);
</script>

<style scoped>
.loader {
  @apply stroke-black bg-conic-gradient-black;
  background: conic-gradient(#000 0 0) 0 / 0% 100% no-repeat text;
  -webkit-text-stroke: 1px #000;
  animation: loader 1s linear infinite;
}

/* Dark mode adjustments */
.dark .loader {
  @apply stroke-white bg-conic-gradient-white;
  background: conic-gradient(#fff 0 0) 0 / 0% 100% no-repeat text;
  -webkit-text-stroke: 1px #fff;
}

@keyframes loader {
  to {
    background-size: 120% 100%;
  }
}

.stroke-black {
  -webkit-text-stroke: 1px #000;
}

.bg-conic-gradient-black {
  background: conic-gradient(#000 0 0) 0 / 0% 100% no-repeat text;
}

/* White stroke and gradient for dark mode */
.stroke-white {
  -webkit-text-stroke: 1px #fff;
}

.bg-conic-gradient-white {
  background: conic-gradient(#fff 0 0) 0 / 0% 100% no-repeat text;
}
</style>
