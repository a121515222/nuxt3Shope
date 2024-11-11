<script lang="ts" setup>
interface ModalProps {
  modalPropsId?: string;
  modalPropsTitle?: string;
}
const props = withDefaults(defineProps<ModalProps>(), {
  modalPropsId: "modal",
  modalTitle: ""
});
const overlayVisible = ref(false);
const modalRef = ref<HTMLElement | null>(null);
const modalShow = () => {
  if (modalRef.value) {
    modalRef.value.classList.remove("hidden");
    if (process.client) {
      const body = document.body;
      document.body.classList.add("overflow-hidden");
      overlayVisible.value = true;
    }
  }
};
const modalHide = () => {
  if (modalRef.value) {
    modalRef.value.classList.add("hidden");
    if (process.client) {
      document.body.classList.remove("overflow-hidden");
      overlayVisible.value = false;
    }
  }
};
const modalToggle = () => {
  if (modalRef.value) {
    modalRef.value.classList.toggle("hidden");
    if (process.client) {
      document.body.classList.toggle("overflow-hidden");
      overlayVisible.value = !overlayVisible.value;
    }
  }
};
defineExpose({
  modalShow,
  modalHide,
  modalToggle
});
const emits = defineEmits(["modalConfirm"]);
const confirm = () => {
  emits("modalConfirm");
  modalHide();
};
</script>
<template>
  <div
    ref="modalRef"
    :id="props.modalPropsId"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center items-center"
  >
    <div class="relative w-full h-full max-w-7xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow max-h-[90vh] overflow-y-auto no-scrollbar">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-5 border-b rounded-t bg-gray-300 dark:bg-gray-500"
        >
          <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
            {{ props.modalPropsTitle }}
          </h3>
          <button
            id="closeButton"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="modalHide"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6 bg-gray-200 dark:bg-gray-800">
          <slot></slot>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b bg-gray-300 dark:bg-gray-500"
        >
          <button
            type="button"
            class="text-secondary bg-primary hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="confirm"
          >
            確定
          </button>
          <button
            type="button"
            class="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            @click="modalHide"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- modal overlay -->
  <div v-if="overlayVisible" class="fixed inset-0 bg-gray-900/50 dark:bg-gray-900/80 z-40"></div>
</template>
<style></style>
