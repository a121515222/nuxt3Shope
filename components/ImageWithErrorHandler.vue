<script lang="ts" setup>
const props = defineProps<{
  src: string;
  alt?: string;
  className?: string;
}>();

const imgSrc = ref(props.src);

const handleError = () => {
  imgSrc.value = "/defaultImg/image-1@2x.jpg";
};

onMounted(() => {
  const img = new Image();
  img.onload = () => {
    imgSrc.value = props.src;
  };
  img.onerror = handleError;
  img.src = props.src;
});
</script>
<template>
  <img :src="imgSrc" :alt="alt" :class="className" @error="handleError" />
</template>
<style></style>
