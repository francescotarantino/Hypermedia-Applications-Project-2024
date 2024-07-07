/**
 * This endpoint is responsible for reading a message from OpenAI's chatbot API.
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.openaiApiKey;

  const threadId = event.context.params?.threadId;
  const runId = event.context.params?.runId;

  if (!threadId || !runId) {
    return {
      error: 'Thread ID and Run ID are required',
    };
  }

  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
    method: 'GET',
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

  const runStatus = data.status;
  let message = null;

  if (runStatus === 'completed') {
    const messageResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'assistants=v2',
      },
    });
    const messageData = await messageResponse.json();

    message = removeBracketsContent(messageData.data[0].content[0].text.value);
    message = replaceBoldText(message);
    message = breakLists(message);
  }

  return {
    runStatus: runStatus,
    message
  };
})

function removeBracketsContent(text: string): string {
  // Regular expression to match anything between 【 and 】 including the brackets
  const regex = /【[^【】]*】/g;

  // Replace matched patterns with an empty string
  return text.replace(regex, '');
}

function replaceBoldText(text: string): string {
  // Regular expression to match ** words ** and replace them with bold HTML tags
  const regex = /\*\*(.*?)\*\*/g;

  // Replace matched patterns with <b>text</b>
  return text.replace(regex, '<b>$1</b>');
}

function breakLists(text: string): string {
  // Regular expression to match numbered list items, bulleted list items, and lines starting with dashes
  const regex = /(\d+\.\s+|- )/g;

  // Replace matched patterns with <br> + the matched pattern
  return text.replace(regex, '<br>$&');
}