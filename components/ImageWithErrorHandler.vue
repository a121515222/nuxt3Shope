<script lang="ts" setup>
interface ImageProsData {
  src: string;
  alt?: string;
  className?: string;
  isLazyLoading?: boolean;
}

const props = withDefaults(defineProps<ImageProsData>(), {
  alt: "",
  className: "",
  isLazyLoading: true
});

const imgSrc = ref(props.src);

const handleError = () => {
  imgSrc.value = "/defaultImg/image-1@2x.jpg";
};
const loadingType = computed(() => {
  return process.client && props.isLazyLoading ? "lazy" : "eager";
});
onMounted(() => {
  const img = new Image();
  img.onload = () => {
    imgSrc.value = props.src;
  };
  img.onerror = handleError;
  img.src = props.src;
});
watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      const img = new Image();
      img.onload = () => {
        imgSrc.value = newSrc;
      };
      img.onerror = handleError;
      img.src = newSrc;
    }
  }
);
</script>
<template>
  <img :src="imgSrc" :alt="alt" :class="className" :loading="loadingType" @error="handleError" />
</template>
<style></style>
