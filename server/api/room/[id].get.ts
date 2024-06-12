import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");

  const { data, error } = await client.from("room").select("*").eq("id", id);
  if (error?.length) {
    throw createError({
      statusCode: 500,
      data: error,
    });
  }
  if (data?.length === 0) {
    throw createError({
      statusCode: 404,
      data: error,
      message: "Room Not Found",
    });
  }
  return { room: data[0] };
});
