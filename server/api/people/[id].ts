import {serverSupabaseClient} from "#supabase/server";
import {Database} from "~/types/Supabase";

/**
 * This endpoint returns a single person by id.
 */
export default defineEventHandler(async (event) => {
  // Extract the id from the event context
  const id = event.context.params?.id;

  // If the id is missing, return a 400 error. This should not happen since there is an [runId].ts file that handles the root path.
  if (!id) {
    throw createError({statusCode: 400, message: 'Missing id'});
  }

  const client = await serverSupabaseClient<Database>(event);

  // Query the person by id
  const {data, error} = await client.from('people').select(
    'id, name, surname, birthdate, city, email, bio, hobbies, main_expertise, main_role, languages,' +
    'picture: images(label, path),' +
    'job_experiences(name, role, description, start_date, end_date),' +
    'educations(school_name, course, start_date, end_date),' +
    'responsible_for_services: services!services_main_responsible_id_fkey(id, name, abstract, main_image: images!main_image_id(label, path)),' +
    'involved_in_services: services!service_person_involved(id, name, abstract, main_image: images!main_image_id(label, path)),' +
    'responsible_for_projects: projects!projects_main_responsible_id_fkey(id, name, abstract, main_image: images!main_image_id(label, path)),' +
    'involved_in_projects: projects!project_person_involved(id, name, abstract, main_image: images!main_image_id(label, path))'
  )
    .eq('id', id)
    .single();

  // If there is an error in the query, return a 400 error
  if (error) {
    throw createError({statusCode: 400, message: error.message});
  }

  return data;
})