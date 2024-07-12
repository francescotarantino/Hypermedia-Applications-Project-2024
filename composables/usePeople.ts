/**
 * This composable fetches people data from the API and provides a search functionality and filtering by role.
 *
 * @param filterByRole - The role to filter the people by. If not provided, all people are returned.
 *
 * @return people - The people list, filtered and sorted based on the search query and the filter by role.
 * @return noSearchResults - A boolean indicating if there are no search results, if a search query was provided.
 * @return setSearchQuery - A function to set the search query.
 */
export const usePeople = (filterByRole?: string) => {
  // Fetch people data from the API
  const { data } = useFetch<IPerson[]>('/api/people');

  // Default search query is an empty string
  const searchQuery = ref<string>('');

  // Set search query function, can be used in combination with the SearchBar component
  const setSearchQuery = (query: string) => {
    searchQuery.value = query.toLowerCase().trim();
  };

  // Compute the sorted results based on the search query and the filter by role
  const results = computed<IPerson[]>(() => {
    return data.value?.filter((person) => {
      // Filter people by role

      return filterByRole ? person.main_role === filterByRole : true;
    }).filter((person) => {
      // Check if any of the person's attributes contain the search query

      return[person.name, person.surname, person.bio, person.main_role].some(
        attr => attr.toLowerCase().includes(searchQuery.value)
      );
    }).toSorted((a, b) => {
      // Sort people by surname

      return a.surname.localeCompare(b.surname);
    }) || [];
  });

  const noSearchResults = computed<boolean>(() =>
    results.value.length === 0 && searchQuery.value.length > 0
  );

  return {
    people: results,
    noSearchResults,
    setSearchQuery,
  };
}