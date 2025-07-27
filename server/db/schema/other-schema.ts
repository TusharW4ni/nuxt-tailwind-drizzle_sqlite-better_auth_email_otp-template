import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// export const user = sqliteTable("user", {
//   id: int().primaryKey({ autoIncrement: true }),
//   firstName: text().notNull(),
//   lastName: text().notNull(),
//   email: text().notNull().unique(),
//   archived: integer("archived", { mode: "boolean" }).default(false).notNull(),
// });
