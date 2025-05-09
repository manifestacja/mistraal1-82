import { Message, CURRENT_CONVERSATION_ID } from "@/types/chat";

// The maximum number of messages to keep in memory per conversation
const MAX_MEMORY_LENGTH = 10;

// In-memory storage for chat history (in a real app, this could be persisted to localStorage or a database)
let chatMemory: Record<string, Message[]> = {};

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
};

/**
 * Clears the chat memory for a specific conversation
 */
export const clearChatMemory = (conversationId: string): void => {
  chatMemory[conversationId] = [];
};

/**
 * Formats the chat memory into a string that can be included in prompts to give AI context
 */
export const formatChatMemoryForPrompt = (conversationId: string): string => {
  const messages = getChatMemory(conversationId);
  if (messages.length === 0) return "";
  
  return messages
    .map((msg) => `${msg.type === "user" ? "Użytkownik" : "AI"}: ${msg.content}`)
    .join("\n\n");
};

// Export for use in other files
export { CURRENT_CONVERSATION_ID };
