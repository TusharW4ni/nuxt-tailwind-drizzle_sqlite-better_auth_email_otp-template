import { db } from "../../../utils/drizzle";
import * as schema from "../../../db/schema";

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email } = await readBody(event);

  const newUser = {
    firstName,
    lastName,
    email,
    archived: false, // Default value for new users
  };

  const result = await db.insert(schema.users).values(newUser).returning();

  return result;
});
