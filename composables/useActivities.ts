/**
 * This composable fetches people data from the API and provides a search functionality and filtering by role.
 *
 * @return activities - The activities list, filtered and sorted based on the search query.
 * @return noSearchResults - A boolean indicating if there are no search results, if a search query was provided.
 * @return setSearchQuery - A function to set the search query.
 */
export const useActivities = () => {
  // Fetch both projects and services data from the API
  const { data: projects } = useFetch<IProject[]>('/api/projects');
  const { data: services } = useFetch<IService[]>('/api/services');

  // Default search query is an empty string
  const searchQuery = ref<string>('');

  // Set search query function, can be used in combination with the SearchBar component
  const setSearchQuery = (query: string) => {
    searchQuery.value = query.toLowerCase().trim();
  };

  // Compute the sorted results, combining projects and services, based on the search query
  const results = computed<IActivity[]>(() => {
    let allActivities: IActivity[] = [];

    // Combine projects and services into one array
    if(projects.value && services.value) {
      allActivities = [
        ...projects.value.map((p) => ({...p, type: 'project'})) as IActivity[],
        ...services.value.map((s) => ({...s, type: 'service'})) as IActivity[],
      ];
    }

    return allActivities.filter((activity) => {
        // Check if any of the activity's attributes contain the search query

        return[activity.name, activity.abstract, activity.type].some(
          attr => attr?.toLowerCase().includes(searchQuery.value)
        );
      })
      .toSorted((a, b) => {
        // Sort activities by name

        return a.name.localeCompare(b.name);
      });
  });

  const noSearchResults = computed<boolean>(() =>
    results.value.length === 0 && searchQuery.value.length > 0
  );

  return {
    activities: results,
    noSearchResults,
    setSearchQuery,
  };
}