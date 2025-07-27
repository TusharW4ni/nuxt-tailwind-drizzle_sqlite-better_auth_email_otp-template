import { db } from "../../../utils/drizzle";
import { eq } from "drizzle-orm";
import * as schema from "../../../db/schema";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const result = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id));

  return result;
});
