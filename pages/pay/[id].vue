<script lang="ts" setup>
const route = useRoute();
</script>
<template>
  <div>
    <h1>Pay page</h1>
    <p>id: {{ route.params.id }}</p>
  </div>
</template>
<style></style>
