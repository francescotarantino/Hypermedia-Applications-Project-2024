<template>
  <div>
    <!-- Chatbot Icon -->
    <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer">
      <img src="/chatbot.png" alt="Chatbot Icon" class="w-32 h-32 rounded-full shadow-lg"/>
    </div>
    <!-- Chatbot Window -->
    <div v-if="isOpen" class="fixed bottom-4 right-4 bg-cream w-80 h-96 shadow-lg rounded-lg flex flex-col border border-primary">
      <!-- Header -->
      <div class="p-4 bg-skin font-bold flex justify-between items-center rounded-t-lg">
        <h3 class="text-lg">SHE-HELPER</h3>
        <img src="/chatbot.png" alt="Chatbot Icon" class="w-12 h-12 rounded-full shadow-lg border border-primary"/>
        <button @click="toggleChat" class="font-bold">&times;</button>
      </div>
      <!-- Chat Messages -->
      <div class="h-px bg-primary"/>
      <div class="flex-grow p-4 overflow-y-auto">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div :class="message.isUser ? 'text-right bg-cream-highlight' : 'text-left bg-skin-light'" class="p-2 rounded-md">
            {{ message.text }}
          </div>
        </div>
      </div>
      <!-- Input Field -->
      <div class="h-px bg-primary"/>
      <div class="p-4 bg-cream-highlight rounded-b-lg">
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
    };
  },
  methods: {
    // Toggles the chat window visibility
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    // Sends the user message and handles the AI response
    sendMessage() {
      if (this.userInput.trim() !== '') {
        // Add user message to the messages array
        this.messages.push({ text: this.userInput, isUser: true });
        this.userInput = ''; // Clear the input field
        // Simulate AI response after a delay
        setTimeout(() => {
          this.messages.push({ text: 'This is a response from the AI', isUser: false });
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
