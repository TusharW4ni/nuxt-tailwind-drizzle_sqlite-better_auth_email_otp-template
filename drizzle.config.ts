import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema",
  out: "./server/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./server/db/local.db",
  },
});
