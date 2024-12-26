<script lang="ts" setup>
import BuyerOrder from "@/components/orderLayout/BuyerOrder.vue";
import SellerOrder from "@/components/orderLayout/SellerOrder.vue";

const { addToast } = useToastStore();

const tabConfig = ref([
  {
    name: "BuyerOrder",
    icon: "M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
  },
  {
    name: "SellerOrder",
    icon: "M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
  }
]);
const activeTab = ref("BuyerOrder");
const selectTab = (tabName: string, event: Event) => {
  event.preventDefault();
  activeTab.value = tabName;
};
</script>
<template>
  <div class="container mx-auto px-6 pt-6 mb-6">
    <div class="md:flex">
      <ul
        class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0"
      >
        <li v-for="(tab, index) in tabConfig" :key="index">
          <a
            href="#"
            class="inline-flex items-center px-4 py-3 rounded-lg w-full"
            :class="{
              'text-white bg-primary': activeTab === tab.name,
              'text-gray-700 bg-gray-200 dark:bg-gray-600': activeTab !== tab.name
            }"
            @click="selectTab(tab.name, $event)"
          >
            <!-- 動態 Icon -->
            <svg
              v-if="tab.icon"
              class="w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path :d="tab.icon" />
            </svg>
            {{ tab.name }}
          </a>
        </li>
      </ul>
      <div
        class="p-6 text-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 rounded-lg w-full"
      >
        <template v-if="activeTab === 'BuyerOrder'">
          <BuyerOrder></BuyerOrder>
        </template>
        <template v-else-if="activeTab === 'SellerOrder'">
          <SellerOrder></SellerOrder>
        </template>
      </div>
    </div>
  </div>
</template>
<style></style>
