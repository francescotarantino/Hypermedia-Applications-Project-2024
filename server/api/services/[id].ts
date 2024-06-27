import {serverSupabaseClient} from "#supabase/server";
import {Database} from "~/types/Supabase";

/**
 * This endpoint returns a single service by id.
 */
export default defineEventHandler(async (event) => {
  // Extract the id from the event context
  const id = event.context.params?.id;

  // If the id is missing, return a 400 error. This should not happen since there is an [runId].ts file that handles the root path.
  if (!id) {
    throw createError({statusCode: 400, message: 'Missing id'});
  }

  const client = await serverSupabaseClient<Database>(event);

  // Query the service by id
  const {data, error} = await client.from('services').select(
    'id, name, abstract, description, service_hours, service_hours_description,' +
    'main_image: images!main_image_id(label, path),' +
    'other_images: images!service_other_image(label, path),' +
    'service_testimonials(name, comment, date),' +
    'main_responsible: people!services_main_responsible_id_fkey(id, name, surname, email, picture: images(label, path)),' +
    'people_involved: people!service_person_involved(id, name, surname, email, picture: images(label, path))'
  )
    .eq('id', id)
    .single();

  // If there is an error in the query, return a 400 error
  if (error) {
    throw createError({statusCode: 400, message: error.message});
  }

  return data;
})