import {serverSupabaseClient} from "#supabase/server";
import {Database} from "~/types/Supabase";

/**
 * This endpoint returns all people.
 */
export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);

  // Get all people with minimal information
  const {data, error} = await client.from('people').select(
    'id, name, surname, main_role, bio,' +
    'picture: images(label, path)'
  );

  // If there is an error in the query, return a 400 error
  if (error) {
    throw createError({statusCode: 400, message: error.message});
  }

  return data;
})