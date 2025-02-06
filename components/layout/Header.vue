<script lang="ts" setup>
import { postLogOut, postLogOutNew } from "@/apis/login";
import { clearCookie } from "@/utils/cookie";
const headerRef = ref(null);
const navbarRef = ref<HTMLElement | null>(null);
const indexStore = useIndexStore();
const { userId } = storeToRefs(indexStore);
const { addToast } = useToastStore();
const ariaExpanded = ref(false);
const router = useRouter();
const route = useRoute();
const closeNavbar = () => {
  if (navbarRef.value) {
    navbarRef.value.classList.remove("block");
    navbarRef.value.classList.add("hidden");
  }
  ariaExpanded.value = false;
};
const { shouldShowDarkMode, shouldShowDarkModeText, shouldShowDarkModeBackground } =
  useIndexStore();
const { headerHeight, scrollY, isLogin } = storeToRefs(indexStore);
const getHeight = (ref: Ref<HTMLElement | null>, height: Ref<number>) => {
  if (ref.value) {
    height.value = ref.value.clientHeight;
  }
};
const handleLogout = async () => {
  const res = await postLogOutNew(userId.value);
  if (process.client) {
    clearCookie("authorization");
    localStorage.removeItem("userId");
  }
  if (res.status) {
    addToast({ type: "success", message: "成功登出" });
    isLogin.value = false;
    router.push("/login");
  }
};
const navConfig = [
  {
    name: "使用者資訊",
    path: "/admin/userInfo"
  },
  {
    name: "產品列表",
    path: "/productList"
  },
  {
    name: "文章列表",
    path: "/articleList"
  },
  {
    name: "編輯產品",
    path: "/admin/product"
  },

  {
    name: "編輯文章",
    path: "/admin/article"
  },
  {
    name: "編輯優惠券",
    path: "/admin/coupon"
  },
  {
    name: "訂單管理",
    path: "/admin/order"
  }
];
interface NavList {
  name: string;
  path: string;
}
const showNavbar = computed(() => {
  const result: NavList[] = [];
  navConfig.forEach((list) => {
    //#todo 這邊要改成權限判斷，第一條可以再加一個判斷是否為admin
    // 第二點可以增加是不是登入的狀態
    if (isLogin.value && list.path.includes("/admin")) {
      result.push(list);
    } else if (isLogin.value && list.path === "/userInfo") {
      result.push(list);
    } else if (list.path && !list.path.includes("/admin")) {
      result.push(list);
    } else if (!list.path.includes("/admin")) {
      result.push(list);
    }
  });
  return result;
});
onMounted(() => {
  window.addEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
  getHeight(headerRef, headerHeight);
  window.addEventListener("resize", () => {
    getHeight(headerRef, headerHeight);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", () => {
    scrollY.value = window.scrollY;
  });
  window.removeEventListener("resize", () => {
    getHeight(headerRef, headerHeight);
  });
});
</script>
<template>
  <nav
    class="transition-colors duration-300 fixed w-full z-20 top-0 start-0"
    :class="shouldShowDarkModeBackground()"
    ref="headerRef"
  >
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <NuxtLink
        class="text-2xl font-bold hover:text-white transition-colors duration-300"
        to="/"
        :class="scrollY >= 50 ? 'text-primary-dark' : 'text-secondary-dark'"
      >
        自種自售
      </NuxtLink>
      <div class="flex">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-300"
          :class="shouldShowDarkMode()"
          @click="ariaExpanded = !ariaExpanded"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <ModeSwitchIcon class="md:hidden items-center" />
      </div>

      <div
        ref="navbarRef"
        class="w-full md:block md:w-auto"
        id="navbar-default"
        :class="ariaExpanded ? 'block' : 'hidden'"
      >
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-2 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 transition-colors duration-300"
          :class="shouldShowDarkModeBackground()"
        >
          <li v-for="list in showNavbar">
            <NuxtLink
              @click="closeNavbar()"
              :to="list.path"
              class="block py-2 px-3 text-center rounded md:bg-transparent md:p-0"
              :class="shouldShowDarkModeText()"
              ariaCurrentValue="page"
              activeClass="text-white"
              >{{ list.name }}</NuxtLink
            >
          </li>
          <li v-if="!isLogin">
            <NuxtLink
              @click="closeNavbar()"
              to="/login"
              class="block py-2 px-3 text-center rounded md:bg-transparent md:p-0"
              :class="shouldShowDarkModeText()"
              >登入/註冊</NuxtLink
            >
          </li>
          <li v-else-if="isLogin">
            <a
              @click.prevent="
                closeNavbar();
                handleLogout();
              "
              class="block py-2 px-3 text-center rounded md:bg-transparent md:p-0 hover:cursor-pointer"
              :class="shouldShowDarkModeText()"
            >
              登出
            </a>
          </li>
          <li class="hidden md:block">
            <ModeSwitchIcon />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style></style>
