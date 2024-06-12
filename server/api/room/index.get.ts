import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);

  const { data } = await client
    .from("room")
    .select("*")
    .ilike("name", `%${query?.search || ""}%`);
  return { room: data };
});
