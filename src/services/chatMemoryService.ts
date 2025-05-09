
import { Message, CURRENT_CONVERSATION_ID } from "@/types/chat";

// The maximum number of messages to keep in memory per conversation
const MAX_MEMORY_LENGTH = 10;

// Local storage key for chat history
const CHAT_STORAGE_KEY = "chat_memory";

// In-memory storage for chat history (in a real app, this could be persisted to localStorage or a database)
let chatMemory: Record<string, Message[]> = {};

// Initialize chat memory from localStorage
const initChatMemory = () => {
  try {
    const storedMemory = localStorage.getItem(CHAT_STORAGE_KEY);
    if (storedMemory) {
      chatMemory = JSON.parse(storedMemory);
    }
  } catch (error) {
    console.error("Error loading chat memory from localStorage:", error);
    // If there's an error, we'll start with empty memory
    chatMemory = {};
  }
};

// Call initialization on module load
initChatMemory();

// Save chat memory to localStorage
const saveChatMemory = () => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatMemory));
  } catch (error) {
    console.error("Error saving chat memory to localStorage:", error);
  }
};

/**
 * Retrieves the chat history for a specific conversation
 */
export const getChatMemory = (conversationId: string): Message[] => {
  return chatMemory[conversationId] || [];
};

/**
 * Adds a new message to the chat memory
 */
export const addMessageToMemory = (
  conversationId: string,
  message: Message
): void => {
  if (!chatMemory[conversationId]) {
    chatMemory[conversationId] = [];
  }
  
  // Add the new message
  chatMemory[conversationId].push(message);
  
  // Trim to max length if needed
  if (chatMemory[conversationId].length > MAX_MEMORY_LENGTH) {
    chatMemory[conversationId] = chatMemory[conversationId].slice(
      chatMemory[conversationId].length - MAX_MEMORY_LENGTH
    );
  }
  
  // Save to localStorage after each update
  saveChatMemory();
};

/**
 * Clears the chat memory for a specific conversation
 */
export const clearChatMemory = (conversationId: string): void => {
  chatMemory[conversationId] = [];
  saveChatMemory();
};

/**
 * Formats the chat memory into a string that can be included in prompts to give AI context
 */
export const formatChatMemoryForPrompt = (conversationId: string): string => {
  const messages = getChatMemory(conversationId);
  if (messages.length === 0) return "";
  
  // Format jest dostosowany do potrzeb modelu Mistral - każda wiadomość ma oznaczonego nadawcę
  return messages
    .map((msg) => `${msg.type === "user" ? "Użytkownik" : "AI"}: ${msg.content}`)
    .join("\n\n");
};

// Export for use in other files
export { CURRENT_CONVERSATION_ID };
