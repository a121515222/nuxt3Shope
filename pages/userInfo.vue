<script lang="ts" setup>
import ProfileTabContent from "@/components/userInfoLayout/ProfileTabContent.vue";
import DashboardTabContent from "@/components/userInfoLayout/DashboardTabContent.vue";
import SettingsTabContent from "@/components/userInfoLayout/SettingsTabContent.vue";

const tabConfig = ref([
  {
    name: "Profile",
    icon: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
  },
  {
    name: "Dashboard",
    icon: "M3 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Zm9 2h4v5h-4V4ZM4 4h7v7H4V4Zm0 9h5v3H4v-3Zm7 3v-5h5v5h-5Z"
  },
  {
    name: "Settings",
    icon: "M12.944 1.628a1.992 1.992 0 0 0-2.002 0l-.563.333a1 1 0 0 1-1.42-.416l-.447-.894a2 2 0 0 0-2.664-.877l-.615.308a2 2 0 0 0-.877 2.664l.447.894a1 1 0 0 1-.415 1.42l-.333.562a1.992 1.992 0 0 0 0 2.002l.333.563a1 1 0 0 1-.416 1.42l-.894.447a2 2 0 0 0-.877 2.664l.308.615a2 2 0 0 0 2.664.877l.894-.447a1 1 0 0 1 1.42.415l.563.333a1.992 1.992 0 0 0 2.002 0l.563-.333a1 1 0 0 1 1.42.416l.447.894a2 2 0 0 0 2.664.877l.615-.308a2 2 0 0 0 .877-2.664l-.447-.894a1 1 0 0 1 .415-1.42l.333-.563a1.992 1.992 0 0 0 0-2.002l-.333-.563a1 1 0 0 1 .416-1.42l.894-.447a2 2 0 0 0 .877-2.664l-.308-.615a2 2 0 0 0-2.664-.877l-.894.447a1 1 0 0 1-1.42-.415l-.563-.333ZM10 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
  }
]);
const activeTab = ref("Profile");
const selectTab = (tabName: string, event: Event) => {
  event.preventDefault();
  activeTab.value = tabName;
};
</script>
<template>
  <div class="container mx-auto px-6 pt-6">
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
        class="p-6 text-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 rounded-lg w-full"
      >
        <template v-if="activeTab === 'Profile'">
          <ProfileTabContent />
        </template>
        <template v-else-if="activeTab === 'Dashboard'">
          <DashboardTabContent />
        </template>
        <template v-else-if="activeTab === 'Settings'">
          <SettingsTabContent />
        </template>
      </div>
    </div>
  </div>
</template>
<style></style>
