<script lang="ts" setup>
const tags = defineModel({
  type: Array,
  default: () => []
});

const tagInput = ref("");

// Function to add a tag
const addTag = () => {
  const trimmedTag = tagInput.value.trim();
  if (trimmedTag) {
    tags.value.push(trimmedTag);
  }
  tagInput.value = "";
};

// Function to remove a tag
const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};
watch(tags, (newVal) => {
  if (newVal) {
    tagInput.value = "";
  }
});
</script>
<template>
  <div class="mx-auto space-y-4">
    <!-- Input Field -->
    <form @submit.prevent="addTag" class="relative">
      <label for="tag-input" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Add Tag</label
      >
      <div class="relative">
        <input
          id="tag-input"
          v-model="tagInput"
          type="text"
          placeholder="Enter a tag"
          class="inputStyle"
        />
        <button
          type="submit"
          class="text-white absolute end-2 bottom-2 bg-primary font-medium rounded-lg text-sm px-2 py-1"
        >
          Add
        </button>
      </div>
    </form>

    <!-- Tag Display -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="flex items-center bg-gray-200 text-black dark:bg-gray-600 dark:text-white text-sm font-medium px-3 py-1 rounded-full"
      >
        {{ tag }}
        <button @click="removeTag(index)" class="ms-2">
          <svg
            class="w-4 h-4 text-red-500 hover:text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>
<style></style>
