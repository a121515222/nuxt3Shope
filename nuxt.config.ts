// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  imports: {
    dirs: ["stores"]
  },
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"]
      }
    ],
    "@nuxtjs/tailwindcss"
  ],
  vite: {
    define: {
      "process.env": process.env
    },
    plugins: [],
    server: {
      proxy: {}
    }
  }
});
