import { drizzle } from "drizzle-orm/libsql";
import { users } from "./schema";

const db = drizzle("file:./server/db/local.db");

async function seed() {
  const user: typeof users.$inferInsert = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  };

  await db.insert(users).values(user);
  console.log("New user seeded:", user);
}

seed()
  .then(() => console.log("Seeding completed successfully."))
  .catch(console.error);
