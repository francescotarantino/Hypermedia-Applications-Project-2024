import {serverSupabaseClient} from "#supabase/server";
import {Database} from "~/types/Supabase";

/**
 * This endpoint returns a single project by id.
 */
export default defineEventHandler(async (event) => {
  // Extract the id from the event context
  const id = event.context.params?.id;

  // If the id is missing, return a 400 error. This should not happen since there is an [runId].ts file that handles the root path.
  if (!id) {
    throw createError({statusCode: 400, message: 'Missing id'});
  }

  const client = await serverSupabaseClient<Database>(event);

  // Query the project by id
  const {data, error} = await client.from('projects').select(
    'id, name, abstract, description,' +
    'main_image: images!main_image_id(label, path),' +
    'other_images: images!project_other_image(label, path),' +
    'main_responsible: people!projects_main_responsible_id_fkey(id, name, surname, email, picture: images(label, path)),' +
    'people_involved: people!project_person_involved(id, name, surname, email, picture: images(label, path))'
  )
    .eq('id', id)
    .single();

  // If there is no data, return a 404 error
  if (!data) {
    throw createError({statusCode: 404, message: 'Project not found'});
  }

  // If there is an error in the query, return a 400 error
  if (error) {
    throw createError({statusCode: 400, message: error.message});
  }

  return data;
})