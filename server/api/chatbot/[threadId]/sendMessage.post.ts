/**
 * This endpoint is responsible for creating a new thread in OpenAI's chatbot API.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.openaiApiKey;
  const assistantId = config.openaiAssistantId;

  const threadId = event.context.params?.threadId;
  const body = JSON.parse(await readBody(event));

  const userInput = body.userInput;

  // Call Assistant API to send a message
  await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2',
    },
    body: JSON.stringify({ role: 'user', content: userInput }),
  });

  // Call Assistant API to create a run
  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2',
    },
    body: JSON.stringify({
      assistant_id: assistantId,
      max_completion_tokens: 512,
      top_p: 0.8,
    }),
  });

  if (response.status !== 200) {
    throw createError({statusCode: 500, message: 'There was an error during the request.'});
  }

  const data = await response.json();

  return {
    runId: data.id,
  };
})