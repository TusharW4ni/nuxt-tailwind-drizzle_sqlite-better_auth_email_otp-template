import { drizzle } from "drizzle-orm/libsql";
import { user } from "./schema/auth-schema";

const db = drizzle("file:./server/db/local.db");

async function seed() {
  const newUser: typeof user.$inferInsert = {
    name: "John Doe", // Combine first and last name
    // firstName: "John",
    // lastName: "Doe",
    email: "john.doe@example.com",
  };
  await db.insert(user).values(newUser);
  console.log("New user seeded:", newUser);
}

seed()
  .then(() => console.log("Seeding completed successfully."))
  .catch(console.error);
