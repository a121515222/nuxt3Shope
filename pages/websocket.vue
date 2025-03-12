<script lang="ts" setup>
import { useNuxtApp } from "#app";
const { $socket } = useNuxtApp();
const messages = ref<string[]>([]);
const newMessage = ref("");
const toUserId = ref("");
const sendMessage = () => {
  if (newMessage.value.trim()) {
    const socketData = {
      message: newMessage.value,
      userId: localStorage.getItem("userId"),
      toUserId: toUserId.value
    };
    $socket.emit("message", socketData);
    newMessage.value = "";
  }
};
const chatSomeone = () => {
  const socketData = {
    message: newMessage.value,
    userId: localStorage.getItem("userId"),
    toUserId: toUserId.value
  };
  $socket.emit("chatSomeone", socketData);
  newMessage.value = "";
};
const connectBackEnd = () => {
  if (!$socket) {
    console.error("WebSocket 连接未初始化！");
    return;
  }
  $socket.connect();
};
onMounted(() => {
  if (!$socket) {
    console.error("WebSocket 连接未初始化！");
    return;
  }

  $socket.on("connect", () => {
    console.log("WebSocket 已连接:", $socket.id);
  });
  $socket.on("receiveMessage", (msg: any) => {
    const { message } = msg;
    console.log("收到消息:", msg);
    messages.value.push(message);
  });
  $socket.on("receiveChat", (msg: any) => {
    const { message } = msg;
    messages.value.push(message);
  });
});
</script>
<template>
  <div>
    <h1>WebSocket Chat</h1>

    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
    <input v-model="toUserId" placeholder="聊天對象userId" type="text" />
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="..." />
    <button class="bg-primary dark:text-white px-2 py-1" @click="sendMessage">發送</button>
    <button class="bg-primary dark:text-white px-2 py-1" @click="chatSomeone">私聊</button>
    <button class="bg-primary dark:text-white px-2 py-1" @click="connectBackEnd">連線</button>
  </div>
</template>
<style></style>
