<script lang="ts" setup>
import { type AdminCoupon } from "@/types/adminCouponTypes";
import dayjs from "dayjs";
import {
  getAdminCoupons,
  createCoupon,
  editAdminCoupon,
  deleteAdminCoupon
} from "@/apis/adminCoupon";

const indexStore = useIndexStore();
const { addToast } = useToastStore();
const { isDarkMode } = storeToRefs(indexStore);
const messageBoxStore = useMessageBoxStore();
const { showAlert, showConfirm } = messageBoxStore;
const datePickerRef = ref<HTMLElement | null>(null);
const coupons = ref<AdminCoupon[]>([]);
const isLoading = ref(false);
const isAddNewCoupon = ref(false);
const postId = ref("");
const modalData = ref<AdminCoupon>({
  title: "",
  code: "",
  expireDate: new Date().getTime(),
  _id: "",
  isPublic: false,
  discount: 100,
  couponNum: 0,
  userId: ""
});

const modalRef = ref<{ modalShow: () => void } | null>(null);
const openModal = async (item: string | AdminCoupon = "") => {
  if (modalRef.value) {
    modalRef.value.modalShow();
    if (typeof item !== "string" && item._id) {
      modalData.value = {
        ...item
      };
    } else {
      modalData.value = {
        title: "",
        code: "",
        expireDate: new Date().getTime(),
        _id: "",
        isPublic: false,
        discount: 0,
        couponNum: 0,
        userId: ""
      };
    }
  }
};
const handleAdminCouponModalData = async () => {
  if (!modalData.value?.code || modalData.value?.code === "") {
    await showAlert("警告", "請輸入優惠碼");
    return;
  }
  modalData.value.expireDate = new Date(modalData.value.expireDate).getTime();
};
const handleGetAdminCoupons = async (page: number = 1, limit: number = 10) => {
  const res = await getAdminCoupons(page, limit);
  if (res.status) {
    coupons.value = res.data.coupons;
    paginationData.value = res.data.pagination;
  }
};
const handleAddAdminCoupon = async () => {
  try {
    isLoading.value = true;
    await handleAdminCouponModalData();
    const res = await createCoupon(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "新增成功" });
      await handleGetAdminCoupons();
    } else {
      addToast({ type: "danger", message: "新增失敗" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
const handleEditAdminCoupon = async () => {
  try {
    isLoading.value = true;
    await handleAdminCouponModalData();
    const res = await editAdminCoupon(modalData.value);
    if (res.status) {
      addToast({ type: "success", message: "編輯成功" });
      await handleGetAdminCoupons();
    } else {
      addToast({ type: "danger", message: "編輯失敗" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
const handleDeleteAdminCoupon = async (id: string) => {
  const confirm = await showConfirm("警告", "確定要刪除嗎?");
  if (confirm) {
    try {
      isLoading.value = true;
      const res = await deleteAdminCoupon(id);
      if (res.status) {
        addToast({ type: "success", message: "刪除成功" });
        await handleGetAdminCoupons();
      } else {
        addToast({ type: "danger", message: "刪除失敗" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    addToast({ type: "warning", message: "取消刪除" });
  }
};
const handleModalConfirm = async (id: string) => {
  if (isAddNewCoupon.value) {
    await handleAddAdminCoupon();
  } else {
    await handleEditAdminCoupon();
  }
};
const showDate = computed(() => {
  return dayjs(modalData.value.expireDate).format("YYYY-MM-DD");
});
const showDatePicker = () => {
  if (datePickerRef.value) {
    datePickerRef.value.classList.remove("hidden");
  }
};
const hideDatePicker = () => {
  if (datePickerRef.value) {
    datePickerRef.value.classList.add("hidden");
  }
};
// 監聽外部點擊事件
const handleClickOutside = (event: MouseEvent) => {
  // 檢查是否為左鍵點擊
  if (event.button !== 0) return;

  // 如果日期選擇器存在且點擊位置不在日期選擇器內
  if (datePickerRef.value && !datePickerRef.value.contains(event.target as Node)) {
    hideDatePicker();
  }
};
const paginationData = ref();
const handleChangePage = async (page: number) => {
  await handleGetAdminCoupons(page);
};
onMounted(async () => {
  await handleGetAdminCoupons();
  document.addEventListener("mousedown", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
<template>
  <div class="container mx-auto px-6">
    <div class="py-5 dark:text-white">
      <h2 class="text-2xl font-semibold">優惠券列表</h2>
      <div class="flex justify-end mb-3">
        <!-- Button trigger modal -->
        <button
          class="btn bg-primary text-white hover:opacity-80 px-4 py-2 rounded-lg border-primary"
          type="button"
          @click="
            isAddNewCoupon = true;
            openModal();
          "
        >
          增加優惠券
        </button>
      </div>
      <div class="w-full my-3">
        <div class="border rounded-lg bg-gray-400 dark:bg-gray-500 overflow-x-auto">
          <table class="min-w-full table-auto">
            <thead>
              <tr class="text-nowrap">
                <th class="px-4 py-2">名稱</th>
                <th class="px-4 py-2">折扣價格</th>
                <th class="px-4 py-2">使用期限</th>
                <th class="px-4 py-2">優惠碼</th>
                <th class="px-4 py-2">優惠券數量</th>
                <th class="px-4 py-2">是否啟用</th>
                <th class="px-4 py-2">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in coupons"
                :key="item._id + index"
                class="hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 text-nowrap"
                :class="{ 'bg-gray-300 dark:bg-gray-400': index % 2 === 0 }"
              >
                <td class="border px-4 py-2 text-center">{{ item.title }}</td>
                <td class="border px-4 py-2 text-center">{{ item.discount }}</td>
                <td class="border px-4 py-2 text-center" v-timeFormat="item.expireDate"></td>
                <td class="border px-4 py-2 text-center">{{ item.code }}</td>
                <td class="border px-4 py-2 text-center">{{ item.couponNum }}</td>
                <td
                  class="border text-center px-4 py-2 text-green-500 dark:text-green-200"
                  :class="{ 'text-red-500 dark:text-red-600': !item.isPublic }"
                >
                  {{ item.isPublic ? "啟用" : "不啟用" }}
                </td>

                <td class="border px-4 py-2 flex justify-center gap-4">
                  <button
                    class="border-primary border-2 px-4 py-2 rounded-lg hover:bg-primary"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item._id;
                      isAddNewCoupon = false;
                      openModal(item);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    編輯
                  </button>
                  <button
                    class="border border-red-500 border-2 px-4 py-2 rounded-lg hover:bg-red-500"
                    type="button"
                    :disabled="isLoading"
                    :class="{ 'cursor-not-allowed': isLoading }"
                    @click="
                      postId = item._id;
                      handleDeleteAdminCoupon(item._id);
                    "
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="p-1">一共有 {{ coupons.length }} 優惠券列表</p>
        </div>
        <Pagination :pagination="paginationData" @changePage="handleChangePage" />
      </div>
    </div>
  </div>

  <Modal
    ref="modalRef"
    :modalPropsId="'adminProductModal'"
    :modalPropsTitle="isAddNewCoupon ? '新增優惠券' : '編輯優惠券'"
    @modalConfirm="handleModalConfirm"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 my-3">
      <div class="mb-3">
        <label class="block col-span-1 text-gray-700 dark:text-white" for="couponTitle"
          >優惠券名稱</label
        >
        <input
          class="block inputStyle"
          id="couponTitle"
          placeholder="請輸入優惠券名稱"
          v-model.trim="modalData.title"
        />
      </div>
      <div class="mb-3">
        <label class="block col-span-1 text-gray-700 dark:text-white" for="couponCode"
          >優惠碼</label
        >
        <input
          class="block inputStyle"
          id="couponCode"
          placeholder="請輸入優惠碼"
          v-model.trim="modalData.code"
        />
      </div>
      <div class="mb-3">
        <label class="block text-gray-700 dark:text-white" for="couponDiscount">優惠折扣</label>
        <input
          class="block inputStyle"
          type="number"
          id="couponDiscount"
          max="100"
          min="0"
          placeholder="請輸入折扣幅度"
          v-model.trim="modalData.discount"
        />
      </div>
      <div class="mb-3">
        <label class="block text-gray-700 dark:text-white" for="couponNum">優惠券數量</label>
        <input
          class="block inputStyle"
          type="number"
          id="couponNum"
          min="0"
          placeholder="請輸入折扣幅度"
          v-model.trim="modalData.couponNum"
        />
      </div>
      <div class="mb-3">
        <label class="block text-gray-700 dark:text-white" for="couponExpireDate">優惠券期限</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            class="text-sm rounded-lg ps-10 p-2.5 block dark:placeholder-gray-400 dark:text-white w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary placeholder-gray-400 placeholder:dark:text-white dark:bg-gray-700 dark:text-white"
            placeholder="請選擇到齊日期"
            v-model="showDate"
            @focus="showDatePicker"
          />
          <div ref="datePickerRef" class="absolute z-10 hidden">
            <VDatePicker
              id="couponExpireDate"
              v-model="modalData.expireDate"
              :is-dark="isDarkMode"
              @dayclick="hideDatePicker"
            />
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="block text-gray-700 dark:text-white">是否公開</label>
        <label class="inline-flex items-center cursor-pointer pt-1">
          <input type="checkbox" value="" class="sr-only peer" v-model="modalData.isPublic" />
          <div
            class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
          ></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        </label>
      </div>
    </div>
  </Modal>
</template>
<style></style>
