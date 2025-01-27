<script lang="ts" setup>
interface AutoCompleteProps {
  autoCompleteListProp: string[];
  isShowAutoCompleteProp: boolean;
  searchInfoProp: string;
  searchInputRefProp: HTMLInputElement | null;
}
const props = withDefaults(defineProps<AutoCompleteProps>(), {
  autoCompleteListProp: (): string[] => [],
  isShowAutoCompleteProp: false,
  searchInfoProp: "",
  searchInputRefProp: null
});
const autoCompleteList = ref<string[]>([]);

const searchInfo = computed(() => props.searchInfoProp);

watch(searchInfo, (value) => {
  if (value) {
    autoCompleteList.value = props.autoCompleteListProp;
  }
});
const emit = defineEmits(["autoCompleteListEmit", "hideAutoComplete"]);
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
const autoCompleteRef = ref<HTMLElement | null>(null);
const handleClickOutside = (event: MouseEvent) => {
  if (
    autoCompleteRef.value &&
    !autoCompleteRef.value.contains(event.target as Node) &&
    props.searchInputRefProp &&
    !props.searchInputRefProp?.contains(event.target as Node)
  ) {
    emit("hideAutoComplete");
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <ul
    v-show="autoCompleteList.length > 0 && props.isShowAutoCompleteProp"
    class="bg-white w-full border border-gray-300 rounded-md shadow-md z-10"
    ref="autoCompleteRef"
  >
    <li
      v-for="(list, index) in autoCompleteList"
      :key="list + index"
      class="hover:bg-gray-100 text-color-800 p-2 cursor-pointer text-sm lg:text-base"
      :class="listHoverStyle(index)"
      @click="emitList(list)"
    >
      {{ list }}
    </li>
  </ul>
</template>
