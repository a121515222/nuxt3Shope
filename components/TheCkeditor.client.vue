<script lang="ts" setup>
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from "ckeditor5";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

const editor = ClassicEditor;
const modelValue = defineModel<string | undefined>();
const editorConfig = {
  plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
  toolbar: ["bold", "italic", "|", "undo", "redo"],

  licenseKey: ""
};
</script>
<template>
  <div>
    <ckeditor :editor="editor" v-model="modelValue" :config="editorConfig"> </ckeditor>
  </div>
</template>
<style></style>
