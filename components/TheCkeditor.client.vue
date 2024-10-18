<script lang="ts" setup>
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from "ckeditor5";
import { Ckeditor } from "@ckeditor/ckeditor5-vue";
import "ckeditor5/ckeditor5.css";
import translations from "ckeditor5/translations/zh.js";

const editor = ClassicEditor;
const modelValue = defineModel<string | undefined>();
const editorConfig = {
  plugins: [
    AccessibilityHelp,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Essentials,
    Heading,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    SelectAll,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
    Undo
  ],
  toolbar: [
    "undo",
    "redo",
    "|",
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "|",
    "link",
    "insertImage",
    "insertImageViaUrl",
    "mediaEmbed",
    "insertTable",
    "blockQuote",
    "|",
    "bulletedList",
    "numberedList",
    "todoList",
    "outdent",
    "indent"
  ],
  heading: {
    options: [
      {
        model: "paragraph" as const,
        title: "Paragraph",
        class: "ck-heading_paragraph"
      },
      {
        model: "heading1" as const,
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1"
      },
      {
        model: "heading2" as const,
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2"
      },
      {
        model: "heading3" as const,
        view: "h3",
        title: "Heading 3",
        class: "ck-heading_heading3"
      },
      {
        model: "heading4" as const,
        view: "h4",
        title: "Heading 4",
        class: "ck-heading_heading4"
      },
      {
        model: "heading5" as const,
        view: "h5",
        title: "Heading 5",
        class: "ck-heading_heading5"
      },
      {
        model: "heading6" as const,
        view: "h6",
        title: "Heading 6",
        class: "ck-heading_heading6"
      }
    ]
  },
  image: {
    toolbar: [
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "imageStyle:inline",
      "imageStyle:wrapText",
      "imageStyle:breakText",
      "|",
      "resizeImage"
    ]
  },
  language: "zh",
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
    decorators: {
      toggleDownloadable: {
        mode: "manual" as const,
        label: "Downloadable",
        attributes: {
          download: "file"
        }
      }
    }
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  menuBar: {
    isVisible: true
  },
  placeholder: "Type or paste your content here!",
  table: {
    contentToolbar: [
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "tableProperties",
      "tableCellProperties"
    ]
  },
  translations: [translations],
  licenseKey: ""
};
</script>
<template>
  <div>
    <ckeditor :editor="editor" v-model="modelValue" :config="editorConfig"> </ckeditor>
  </div>
</template>
<style></style>
