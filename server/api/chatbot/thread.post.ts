/**
 * This endpoint is responsible for creating a new thread in OpenAI's chatbot API.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.openaiApiKey;

  const response = await fetch(`https://api.openai.com/v1/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2',
    },
  });

  if (response.status !== 200) {
    throw createError({statusCode: 500, message: 'There was an error during the request.'});
  }

  const data = await response.json();

  return {
    threadId: data.id,
  };
})