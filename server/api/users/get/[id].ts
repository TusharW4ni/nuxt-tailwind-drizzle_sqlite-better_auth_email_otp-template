import { db } from "../../../utils/drizzle";
import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema/auth-schema";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const result = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, id));

  return result;
});
