<template>
  <div>
    <!-- Chatbot Icon (visible when the chat is closed) -->
    <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer">
      <img src="/chatbot.png" alt="Chatbot Icon" class="w-32 h-32 rounded-full shadow-lg"/>
    </div>
    <!-- Chatbot Window (visible when the chat is open) -->
    <div v-if="isOpen" class="fixed bottom-4 right-4 bg-cream w-80 h-96 shadow-lg rounded-lg flex flex-col border border-primary" ref="chatContainer">
      <!-- Header with Chatbot Title and Close Button -->
      <div class="p-4 bg-skin font-bold flex justify-between items-center rounded-t-lg">
        <h3 class="text-lg">SHE-HELPER</h3>
        <img src="/chatbot.png" alt="Chatbot Icon" class="w-12 h-12 rounded-full shadow-lg border border-primary"/>
        <button @click="toggleChat" class="font-bold">&times;</button>
      </div>
      <!-- Divider -->
      <div class="h-px bg-primary z-40"></div>
      <!-- Chat Messages Container -->
      <div class="flex-grow p-4 overflow-y-auto" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <!-- Display each message with conditional styling based on whether it is from the user or the bot -->
          <div :class="message.isUser ? 'text-right bg-cream-highlight' : 'text-left bg-skin-light'" class="p-2 rounded-md">
            {{ message.text }}
          </div>
        </div>
      </div>
      <!-- Divider -->
      <div class="h-px bg-primary z-40"></div>
      <!-- Input Field for User Messages -->
      <div class="p-4 bg-cream-highlight rounded-b-lg">
        <input v-model="userInput" @keydown.enter="userTyped" type="text" placeholder="Type a message..." class="w-full bg-cream p-2 rounded-md"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false, // Indicates if the chat window is open
      userInput: '', // Binds to the user's input in the text field
      messages: [], // Array to store chat messages
      threadId: null, // To store the conversation thread ID
      runId: null, // To store the run ID
      runStatus: null, // To store the run status
      BotResponse: null, // To store the Bot response
      taskEnded: true, // Indicates if the current task has ended
    };
  },

  created() {
    // Starts a thread for the chat when the component is created
    this.initiateConversationThread();
  },

  methods: {

    // Toggles the chat window visibility
    toggleChat() {
      this.isOpen = !this.isOpen;
      this.scrollToBottom();
    },

    // Scrolls the chat to the bottom
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
    },

    // Initiates a new conversation thread
    async initiateConversationThread() {
      const config = useRuntimeConfig();
      const apiKey = config.public.openaiApiKey;
      try {
        const response = await fetch(`https://api.openai.com/v1/threads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        });
        const data = await response.json();
        this.threadId = data.id;
      } catch (error) {
        // Handle error by displaying a message to the user
        this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
        this.taskEnded = true;
      }
    },

    // Handles user input when the user presses Enter
    async userTyped() {
      if (this.userInput.trim() !== '' && this.taskEnded) {
        this.taskEnded = false;
        // Add user message to the messages array
        this.messages.push({ text: this.userInput, isUser: true });
        // Store user input locally before clearing it
        const userInput = this.userInput;
        this.userInput = ''; // Clear the input field
        await this.sendMessage(userInput);
      }
    },

    // Sends the user message to the AI and handles the response
    async sendMessage(userInput) {
      const config = useRuntimeConfig();
      const apiKey = config.public.openaiApiKey;

      try {
        // Call Assistant API to send the message
        const response = await fetch(`https://api.openai.com/v1/threads/${this.threadId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
          body: JSON.stringify({ role: 'user', content: userInput }),
        });
      
        await this.createRun();

      } catch (error) {
        // Handle error by displaying a message to the user
        this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
        this.taskEnded = true;
      }
    },

    // Initiates a run to process the user message
    async createRun() {
      const config = useRuntimeConfig();
      const apiKey = config.public.openaiApiKey;
      const assistantId = config.public.openaiAssistantId;

      try {
        // Call Assistant API to create a run
        const response = await fetch(`https://api.openai.com/v1/threads/${this.threadId}/runs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
          body: JSON.stringify({ assistant_id: assistantId }),
        });

        const data = await response.json();
        this.runId = data.id;
        this.runStatus = data.status;

        await this.retrieveRun();

      } catch (error) {
        // Handle error by displaying a message to the user
        this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
        this.taskEnded = true;
      }
    },

    // Retrieves the run status and waits for completion
    async retrieveRun() {
      const config = useRuntimeConfig();
      const apiKey = config.public.openaiApiKey;
      this.runStatus = null;
      while (this.runStatus !== 'completed') {
        try {
          // Call Assistant API to retrieve the run status
          const response = await fetch(`https://api.openai.com/v1/threads/${this.threadId}/runs/${this.runId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`,
              'OpenAI-Beta': 'assistants=v2',
            },
          });

          const data = await response.json();
          this.runStatus = data.status;
          
          if (this.runStatus === 'failed') {
            this.runStatus = null;
            this.sendMessage(this.userInput);
            this.taskEnded = true;
            break;
          }
          
        } catch (error) {
          console.error('Error:', error);
          // Handle error by displaying a message to the user
          this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
          this.taskEnded = true;
        }
        if (this.runStatus === 'completed') {
          await this.retrieveBotMessage();
        }
      }
    },

    // Retrieves the bot's response after the run is completed
    async retrieveBotMessage() {
      const config = useRuntimeConfig();
      const apiKey = config.public.openaiApiKey;

      try {
        // Call Assistant API to retrieve the bot's message
        const response = await fetch(`https://api.openai.com/v1/threads/${this.threadId}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        });

        const data = await response.json();
        this.BotResponse = data.data[0].content[0].text.value;

        // Add AI response to the messages array
        this.messages.push({ text: this.BotResponse, isUser: false });
        this.scrollToBottom();
        setTimeout(1000);
        this.taskEnded = true;
      } catch (error) {
        console.error('Error:', error);
        // Handle error by displaying a message to the user
        this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
        this.taskEnded = true;
      }
    },

  },

};
</script>
