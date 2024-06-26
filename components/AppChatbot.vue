<template>
  <div>
    <transition name="fade">
      <!-- Chatbot Icon (visible when the chat is closed) -->
      <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer hover:scale-105 transition ease-in-out duration-200" style="z-index: 1000000">
        <img src="/chatbot.png" alt="Chatbot Icon" class="w-16 md:w-24 h:16 md:h-24 rounded-full shadow-lg"/>
      </div>
    </transition>

    <transition name="fade">
      <!-- Chatbot Window -->
      <div v-if="isOpen" class="fixed bottom-4 right-4 left-4 md:left-auto bg-white w-auto md:w-1/2 xl:w-1/4 h-4/5 md:h-3/4 lg:h-2/3 shadow-lg rounded-lg flex flex-col border border-primary" ref="chatContainer" style="z-index: 999999">
        <!-- Header -->
        <div class="p-1 bg-apricot flex justify-between items-center rounded-t-lg">
          <img src="/chatbot.png" alt="Chatbot Icon" class="w-12 h-12 rounded-full shadow-lg border border-primary"/>
          <h3 class="text-lg">SHE-helper</h3>
          <button @click="toggleChat" class="pr-3 hover:opacity-70"><XMarkIcon class="size-6 text-primary" /></button>
        </div>

        <!-- Divider -->
        <div class="h-px bg-primary z-40" />

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

        <!-- Disclaimer -->
        <p class="text-xs opacity-50 text-center">Disclaimer: You are chatting with a virtual assistant, powered by AI. The information provided is not a substitute for professional advice.</p>

        <!-- Input Field -->
        <div class="h-px bg-primary" />
        <div class="p-2 bg-peach rounded-b-lg">
          <input v-model="userInput" @keydown.enter="submitMessage" type="text" placeholder="Type a message..." class="w-full bg-cream p-2 rounded-md" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";

const RESPONSE_CHECK_INTERVAL = 1000;
const FIRST_MESSAGE = 'Hello! Welcome to Signal for Help Empowerment (SHE). How can I support you today?';
const ERROR_MESSAGE = 'An error occurred while communicating with the AI. Please try again later.';

const isOpen = ref(false); // Indicates if the chat window is open
const userInput = ref(''); // Binds to the user's input in the text field
const messages = ref<{
  text: string;
  isUser: boolean;
}[]>([]); // Array to store chat messages
const threadId = ref(null); // Stores the conversation thread ID
const runId = ref(null); // Stores the run ID
const runStatus = ref<
    "queued" | "in_progress" | "completed" | "failed" | null
>(null); // Stores the run status
const taskEnded = ref(true); // Indicates if the current task has ended
const typing = ref(false); // Indicates if the AI is typing
const interval = ref<NodeJS.Timeout | null>(null); // Stores the interval for checking the run status
const messagesContainer = ref<HTMLDivElement>(); // Reference to the chat messages container

// Toggles the chat window visibility
function toggleChat() {
  // If the conversation thread has not been initiated, initiate it
  if (threadId.value === null) {
    // Push a welcome message when the chat is opened
    pushMessage(FIRST_MESSAGE);

    initiateConversationThread();
  }

  isOpen.value = !isOpen.value;
  scrollToBottom();
}

// Scrolls the chat to the bottom
function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Initiates a new conversation thread
async function initiateConversationThread() {
  try {
    const response = await fetch("/api/chatbot/thread", {
      method: 'POST',
    });
    const data = await response.json();
    threadId.value = data.threadId;
  } catch (error) {
    // Handle errors by displaying a message to the user
    pushMessage(ERROR_MESSAGE);
  }
}

// Handles user input when the user presses the Enter key
function submitMessage() {
  if (userInput.value.trim() !== '' && taskEnded.value) {
    taskEnded.value = false;
    pushMessage(userInput.value, true);

    const oldUserInput = userInput.value;
    userInput.value = ''; // Clear the input field

    sendMessage(oldUserInput);
  }
}

// Sends the user message to the AI and handles the response
async function sendMessage(userInput: string) {
  runStatus.value = "queued";

  try {
    // Call Assistant API to send the message
    const response = await fetch(`/api/chatbot/${threadId.value}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();

    runId.value = data.runId;

    retrieveRun();
  } catch (error) {
    // Handle errors by displaying a message to the user
    pushMessage(ERROR_MESSAGE);

    taskEnded.value = true;
  }
}

// Retrieves the run status and waits for completion
function retrieveRun() {
  interval.value = setInterval(async () => {
    // Display typing indicator
    typing.value = true;
    scrollToBottom();

    const response = await fetch(`/api/chatbot/${threadId.value}/readMessage/${runId.value}`, {
      method: 'GET',
    });

    const data = await response.json();

    // If the previous run status is completed or failed, stop the interval, to prevent the same message from being pushed multiple times
    if (runStatus.value === 'completed' || runStatus.value === 'failed') {
      clearInterval(interval.value!);
      return;
    }

    runStatus.value = data.runStatus;

    if (runStatus.value !== 'queued' && runStatus.value !== 'in_progress') {
      clearInterval(interval.value!);
      taskEnded.value = true;
    }

    if (runStatus.value === 'completed') {
      typing.value = false;
      pushMessage(data.message);
    } else if (runStatus.value === 'failed') {
      sendMessage(userInput.value);
    }
  }, RESPONSE_CHECK_INTERVAL);
}

// Pushes a message to the chat window
function pushMessage(text: string, isUser = false) {
  messages.value.push({ text, isUser });

  // Scroll to the bottom of the chat
  scrollToBottom();
}
</script>
