<script lang="ts" setup>
interface AutoCompleteProps {
  autoCompleteListProp: string[];
  isShowAutoCompleteProp: boolean;
  searchInfoProp: string;
}
const props = withDefaults(defineProps<AutoCompleteProps>(), {
  autoCompleteListProp: (): string[] => [],
  isShowAutoCompleteProp: false,
  searchInfoProp: ""
});
const autoCompleteList = ref<string[]>([]);

const searchInfo = computed(() => props.searchInfoProp);

watch(searchInfo, (value) => {
  if (value) {
    autoCompleteList.value = props.autoCompleteListProp
      .map((list) => {
        if (list.includes(value)) {
          return list;
        }
      })
      .filter((list) => list !== undefined);
  }
});
const emit = defineEmits(["autoCompleteListEmit"]);
const emitList = (list: string): void => {
  emit("autoCompleteListEmit", list);
};
const listHoverStyle = (index: number) => {
  if (index === 0) {
    return "hover:rounded-t-md";
  }
  if (index === props.autoCompleteListProp.length - 1) {
    return "hover:rounded-b-md";
  }
};
</script>

<template>
  <ul
    v-show="autoCompleteList.length > 0 && props.isShowAutoCompleteProp"
    class="bg-white w-full border border-gray-300 rounded-md shadow-md z-10"
  >
    <li
      v-for="(list, index) in autoCompleteList"
      :key="index + list"
      class="hover:bg-gray-100 text-color-800 p-2 cursor-pointer text-sm lg:text-base"
      :class="listHoverStyle(index)"
      @click="emitList(list)"
    >
      {{ list }}
    </li>
  </ul>
</template>
