<script lang="ts" setup>
import { getComment } from "@/apis/commentAPI";
const route = useRoute();
onMounted(async () => {
  if (!route.params.id) {
    return;
  } else {
    const comment = await getComment(
      Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    );
  }
});
</script>
<template>
  <div>
    <h1>Comment</h1>
    <p>Comment ID: {{ route.params.id }}</p>
  </div>
</template>
<style></style>
