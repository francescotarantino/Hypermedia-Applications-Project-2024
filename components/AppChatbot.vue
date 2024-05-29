<template>
  <div>
    <!-- Chatbot Icon (visible when the chat is closed) -->
    <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer" style="z-index: 999999">
      <img src="/chatbot.png" alt="Chatbot Icon" class="w-24 h-24 rounded-full shadow-lg"/>
    </div>
    <!-- Chatbot Window -->
    <div v-if="isOpen" class="fixed bottom-4 right-4 bg-white w-1/4 h-2/3 shadow-lg rounded-lg flex flex-col border border-primary" ref="chatContainer" style="z-index: 999999">
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
        <!-- Typing Indicator -->
        <div v-if="typing" class="text-left bg-peach p-2 rounded-md opacity-50">
          <p class="text-sm italic">Typing...</p>
        </div>
      </div>
      <!-- Input Field -->
      <div class="h-px bg-primary"/>
      <div class="p-2 bg-peach rounded-b-lg">
        <input v-model="userInput" @keydown.enter="submitMessage" type="text" placeholder="Type a message..." class="w-full bg-cream p-2 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script>

const RESPONSE_CHECK_INTERVAL = 1000;

export default {
  data() {
    return {
      isOpen: false, // Indicates if the chat window is open
      userInput: '', // Binds to the user's input in the text field
      messages: [], // Array to store chat messages
      threadId: null, // To store the conversation thread ID
      runId: null, // To store the run ID
      runStatus: null, // To store the run status
      taskEnded: true, // Indicates if the current task has ended
      typing: false, // Indicates if the AI is typing
      interval: null, // To store the interval for checking the run status
    };
  },

  methods: {

    // Toggles the chat window visibility
    toggleChat() {
      // If the conversation thread has not been initiated, initiate it
      if (this.threadId === null) {
        // Push a welcome message when the chat is opened
        this.pushMessage('Hello! Welcome to Signal for Help Empowerment (SHE). How can I support you today?');

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
        });
        const data = await response.json();
        this.threadId = data.threadId;
      } catch (error) {
        // Handle error by displaying a message to the user
        this.pushMessage('An error occurred while communicating with the AI. Please try again later.');
      }
    },

    // Handles user input when the user presses the Enter key
    submitMessage() {
      if (this.userInput.trim() !== '' && this.taskEnded) {
        this.taskEnded = false;
        this.pushMessage(this.userInput, true);

        // Store user input locally before clearing it
        const userInput = this.userInput;
        this.userInput = ''; // Clear the input field

        this.sendMessage(userInput);
      }
    },

    // Sends the user message to the AI and handles the response
    async sendMessage(userInput) {
      this.runStatus = "queued";

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
        this.pushMessage('An error occurred while communicating with the AI. Please try again later.');

        this.taskEnded = true;
      }
    },

    // Retrieves the run status and waits for completion
    retrieveRun() {
      this.interval = setInterval(async () => {
        // Display typing indicator
        this.typing = true;
        this.scrollToBottom();

        const response = await fetch(`/api/chatbot/${this.threadId}/readMessage/${this.runId}`, {
          method: 'GET',
        });

        const data = await response.json();

        // If the previous run status is completed or failed, stop the interval, to prevent the same message from being pushed multiple times
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
          this.typing = false;
          this.pushMessage(data.message);
        } else if (this.runStatus === 'failed') {
          this.sendMessage(this.userInput);
        }
      }, RESPONSE_CHECK_INTERVAL);
    },

    pushMessage(text, isUser = false) {
      // Add user message to the messages array
      this.messages.push({ text, isUser });
      // Scroll to the bottom of the chat
      this.scrollToBottom();
    },

  },

};
</script>
