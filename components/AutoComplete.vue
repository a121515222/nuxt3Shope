<script lang="ts" setup>
import { type AutoCompleteProps } from "@/types/searchTypes";
const props = withDefaults(defineProps<AutoCompleteProps>(), {
  autoCompleteListProp: (): string[] => [],
  isShowAutoComplete: false
});
const emit = defineEmits(["autoCompleteListEmit"]);
const emitList = (list: string): void => {
  emit("autoCompleteListEmit", list);
};
</script>

<template>
  <ul
    v-show="props.autoCompleteListProp?.length > 0 && props.isShowAutoCompleteProp"
    class="absolute bg-white relative w-full border border-gray-300 rounded-md shadow-md z-10"
  >
    <li
      v-for="(list, index) in props.autoCompleteListProp"
      :key="index + list"
      class="hover:bg-gray-100 text-color-800 p-2 cursor-pointer text-sm lg:text-base"
      @click="emitList(list)"
    >
      {{ list }}
    </li>
  </ul>
</template>
