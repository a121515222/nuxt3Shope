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
const loadingType = ref<"eager" | "lazy">("eager");
onMounted(() => {
  const img = new Image();
  img.onload = () => {
    imgSrc.value = props.src;
  };
  img.onerror = handleError;
  img.src = props.src;
  loadingType.value = props.isLazyLoading ? "lazy" : "eager";
});

watch(
  () => props.src,
  (newSrc, oldScr) => {
    if (newSrc !== oldScr) {
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
