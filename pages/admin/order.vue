<script lang="ts" setup>
import type { AdminOrder } from "@/types/adminOrderTypes";
import type { Pagination } from "@/types/paginationTypes";
import BuyerOrder from "@/components/orderLayout/BuyerOrder.vue";
import SellerOrder from "@/components/orderLayout/SellerOrder.vue";

const { addToast } = useToastStore();
</script>
<template>
  <div class="container mx-auto px-4 bg-gray-300 dark:bg-gray-800">
    <div class="py-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">訂單管理</h2>
      <div class="py-3">
        <SellerOrder></SellerOrder>
      </div>
      <div class="py-3">
        <BuyerOrder></BuyerOrder>
      </div>
    </div>
  </div>
</template>
<style></style>
