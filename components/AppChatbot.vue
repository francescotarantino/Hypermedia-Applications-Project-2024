<template>
  <div>
    <!-- Chatbot Icon (visible when the chat is closed) -->
    <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer">
      <img src="/chatbot.png" alt="Chatbot Icon" class="w-24 h-24 rounded-full shadow-lg"/>
    </div>
    <!-- Chatbot Window -->
    <div v-if="isOpen" class="fixed bottom-4 right-4 bg-white w-1/4 h-2/3 shadow-lg rounded-lg flex flex-col border border-primary" ref="chatContainer">
      <!-- Header -->
      <div class="p-1 bg-apricot flex justify-between items-center rounded-t-lg">
        <img src="/chatbot.png" alt="Chatbot Icon" class="w-12 h-12 rounded-full shadow-lg border border-primary"/>
        <h3 class="text-lg">SHE-helper</h3>
        <button @click="toggleChat" class="font-bold pr-6">&times;</button>
      </div>
      <!-- Divider -->
      <div class="h-px bg-primary z-40"></div>
      <!-- Chat Messages Container -->
      <div class="flex-grow p-4 overflow-y-auto" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div :class="message.isUser ? 'text-right bg-cream' : 'text-left bg-peach'" class="p-2 rounded-md">
            {{ message.text }}
          </div>
        </div>
      </div>
      <!-- Input Field -->
      <div class="h-px bg-primary"/>
      <div class="p-2 bg-peach rounded-b-lg">
        <input v-model="userInput" @keydown.enter="sendMessage" type="text" placeholder="Type a message..." class="w-full bg-cream p-2 rounded-md"/>
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
      interval: null, // To store the interval for checking the run status
    };
  },

  methods: {

    // Toggles the chat window visibility
    toggleChat() {
      // If the conversation thread has not been initiated, initiate it
      if (this.threadId === null) {
        // Push a welcome message when the chat is opened
        this.messages.push({ text: 'Hello! Welcome to Signal for Help Empowerment (SHE). How can I support you today?', isUser: false });

        this.initiateConversationThread();
      }

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
      try {
        const response = await fetch("/api/chatbot/thread", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        });
        const data = await response.json();
        this.threadId = data.threadId;
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
        // Scroll to the bottom of the chat
        this.scrollToBottom();
        // Store user input locally before clearing it
        const userInput = this.userInput;
        this.userInput = ''; // Clear the input field
        await this.sendMessage(userInput);
      }
    },

    // Sends the user message to the AI and handles the response
    async sendMessage(userInput) {
      this.runStatus = "queuing";

      try {
        // Call Assistant API to send the message
        const response = await fetch(`/api/chatbot/${this.threadId}/sendMessage`, {
          method: 'POST',
          body: JSON.stringify({ userInput }),
        });

        const data = await response.json();

        this.runId = data.runId;

        this.retrieveRun();
      } catch (error) {
        // Handle error by displaying a message to the user
        this.messages.push({ text: 'An error occurred while communicating with the AI. Please try again later.', isUser: false });
        this.taskEnded = true;
      }
    },

    // Retrieves the run status and waits for completion
    retrieveRun() {
      this.interval = setInterval(async () => {
        const response = await fetch(`/api/chatbot/${this.threadId}/readMessage/${this.runId}`, {
          method: 'GET',
        });

        const data = await response.json();

        if (this.runStatus === 'completed' || this.runStatus === 'failed') {
          clearInterval(this.interval);
          return;
        }

        this.runStatus = data.runStatus;

        if (this.runStatus !== 'queued' && this.runStatus !== 'in_progress') {
          clearInterval(this.interval);
          this.taskEnded = true;
        }

        if (this.runStatus === 'completed') {
          this.BotResponse = data.message;
          this.messages.push({ text: this.BotResponse, isUser: false });
          this.scrollToBottom();
          setTimeout(() => {
            this.taskEnded = true;
          }, 1000);
        } else if (this.runStatus === 'failed') {
          this.sendMessage(this.userInput);
          this.taskEnded = true;
        }
      }, 1000);
    },

  },

};
</script>
