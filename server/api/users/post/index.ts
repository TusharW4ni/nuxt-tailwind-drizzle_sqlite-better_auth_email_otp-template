import { db } from "../../../utils/drizzle";
import * as schema from "../../../db/schema/auth-schema";

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email } = await readBody(event);

  const newUser = {
    name: `${firstName} ${lastName}`, // Combine first and last name
    email,
    emailVerified: false, // Default value for new users
    image: null, // Default value for new users
    archived: false, // Default value for new users
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.insert(schema.user).values(newUser).returning();

  return result;
});
