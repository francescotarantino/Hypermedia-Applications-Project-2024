<template>
  <div>
    <transition name="fade">
      <!-- Chatbot Icon (visible when the chat is closed) -->
      <div v-if="!isOpen" @click="toggleChat" class="fixed bottom-4 right-4 cursor-pointer hover:scale-105 transition ease-in-out duration-300 z-chatbotButton"
           aria-label="Open chatbot" role="button" aria-expanded="false" tabindex="0" @keydown.enter="toggleChat">
        <img src="/chatbot.png" alt="" class="w-16 md:w-24 h:16 md:h-24 rounded-full shadow-lg" />
      </div>
    </transition>

    <transition name="fade">
      <!-- Chatbot Window -->
      <div class="fixed bottom-4 right-4 left-4 md:left-auto bg-white w-auto h-4/5 md:w-[420px] md:max-h-[700px] shadow-lg rounded-lg flex flex-col border border-primary z-chatbotPanel"
           v-if="isOpen">
        <!-- Header -->
        <div class="p-1 bg-apricot flex justify-between items-center rounded-t-lg">
          <img src="/chatbot.png" alt="Chatbot" class="w-12 h-12 rounded-full shadow-lg border border-primary" />
          <h3 class="text-lg">SHE-helper</h3>
          <button @click="toggleChat" class="mr-3 p-1 rounded-md hover:bg-peach transition ease-in-out duration-200"
                  aria-label="Close chatbot" aria-expanded="true">
            <XMarkIcon class="size-6" />
          </button>
        </div>

        <!-- Divider -->
        <div class="h-px bg-primary z-40" />

        <!-- Chat Messages Container -->
        <div class="flex-grow p-4 overflow-y-auto" ref="messagesContainer">
          <transition-group name="chat" tag="div">
            <div v-for="(message, index) in messages" :key="index" class="mb-4">
              <p :class="message.isUser ? 'text-right bg-cream' : 'text-left bg-peach'" class="p-2 rounded-md break-words" v-html="message.text" />
            </div>
          </transition-group>

          <transition name="chat">
            <!-- Typing Indicator -->
            <div v-if="typing" class="text-left bg-peach p-2 rounded-md opacity-50">
              <p class="text-sm italic">Typing...</p>
            </div>
          </transition>
        </div>

        <!-- Disclaimer -->
        <p class="text-xs opacity-50 text-center">You are chatting with a virtual assistant, powered by AI. The information provided is not a substitute for professional advice.</p>

        <!-- Input Field -->
        <div class="h-px bg-primary" />
        <div class="p-2 bg-peach rounded-b-lg flex flex-row gap-2">
          <textarea type="text" placeholder="Type a message..." aria-label="Type a message to the chatbot" class="w-full bg-cream p-2 rounded-md resize-none focus:outline-none" rows="1"
                    ref="messageTextarea" v-model.trim="userInput" @keydown.enter.exact.prevent="submitMessage" @input="autoresize" :disabled="!taskEnded" />

          <button @click="submitMessage" :disabled="!taskEnded" class="bg-apricot rounded-md h-full px-2 hover:bg-opacity-50 transition ease-in-out duration-200 disabled:cursor-not-allowed"
                  aria-label="Submit message">
            <PaperAirplaneIcon class="size-6" />
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline";

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
const messageTextarea = ref<HTMLTextAreaElement>(); // Reference to the message textarea

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
    if (messagesContainer.value){
      messagesContainer.value!.scrollTop = messagesContainer.value!.scrollHeight;
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
  if (userInput.value.length !== 0 && taskEnded.value) {
    taskEnded.value = false;
    pushMessage(userInput.value, true);

    sendMessage(userInput.value);
    userInput.value = ''; // Clear the input field

    messageTextarea.value!.style.height = 'auto'; // Reset the input field height
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
      setTimeout(() => {
        pushMessage(data.message);
      }, 500);
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

// Automatically resizes the text area based on the content
function autoresize(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  target.style.height = 'auto';
  target.style.height = Math.min(target.scrollHeight, 200) + 'px';
}
</script>