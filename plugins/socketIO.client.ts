import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseEnv = config.public.baseEnv;
  const baseApi = config.public.baseApiNew;
  const socketBackend = baseEnv === "dev" ? "http://localhost:8086" : baseApi;
  if (process.server) {
    return {};
  }
  const api_token = getCookie("authorization");
  const socket = io(socketBackend, {
    transports: ["websocket"], // 强制使用 WebSocket
    auth: {
      Authorization: api_token || "" // 添加自定义 Header
    }
  });

  return {
    provide: {
      socket
    }
  };
});
