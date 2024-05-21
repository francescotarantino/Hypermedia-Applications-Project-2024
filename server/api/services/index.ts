import {serverSupabaseClient} from "#supabase/server";
import {Database} from "~/types/supabase";

/**
 * This endpoint returns all services.
 */
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  // Get all services with minimal information
  const {data, error} = await client.from('services').select(
    'id, name, abstract,' +
    'main_image: images!main_image_id(label, path)'
  );

  // If there is an error in the query, return a 400 error
  if (error) {
    throw createError({statusCode: 400, message: error.message});
  }

  return data;
})