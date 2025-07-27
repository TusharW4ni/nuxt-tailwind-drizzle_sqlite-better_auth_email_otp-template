import { db } from "../../../utils/drizzle";
import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema";

export default defineEventHandler(async (event) => {
  const results = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.archived, false));
  return results;
});
