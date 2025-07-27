import { db } from "../../../utils/drizzle";
import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema/auth-schema";

export default defineEventHandler(async (event) => {
  const results = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.archived, false));
  return results;
});
