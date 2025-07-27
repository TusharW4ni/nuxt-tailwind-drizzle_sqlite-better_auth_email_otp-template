import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    DB_FILE: "",
    BETTER_AUTH_SECRET: "",
    BETTER_AUTH_URL: "",
    EMAIL_HOST: "", // [!code ++]
    EMAIL_PORT: "", // [!code ++]
    EMAIL_SECURE: "", // [!code ++]
    EMAIL_USER: "", // [!code ++]
    EMAIL_PASS: "", // [!code ++]
    EMAIL_FROM: "", // [!code ++]
    MAILGUN_API_KEY: "", // [!code ++]
    public: {},
  },
});
