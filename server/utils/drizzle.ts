import { drizzle } from "drizzle-orm/libsql";
const rc = useRuntimeConfig();
export const db = drizzle(rc.DB_FILE);
