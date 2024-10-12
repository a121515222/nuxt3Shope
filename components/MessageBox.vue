<script lang="ts" setup>
const messageBoxStore = useMessageBoxStore();
const { isVisible, title, message, type } = storeToRefs(messageBoxStore);
const { confirm, cancel, close } = messageBoxStore;
const handleClick = () => {
  if (type.value === "confirm") {
    confirm();
  } else {
    close();
  }
};
</script>
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-5 rounded shadow-lg w-96">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="my-4">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button
          v-if="type === 'confirm'"
          class="bg-gray-500 text-white px-4 py-2 rounded"
          @click="cancel"
        >
          取消
        </button>
        <button
          :class="type === 'confirm' ? 'bg-primary' : 'bg-gray-500'"
          class="text-white px-4 py-2 rounded"
          @click="handleClick"
        >
          {{ type === "confirm" ? "確認" : "關閉" }}
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
