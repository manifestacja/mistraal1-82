
import { MistralModelId } from "./models";

export type MessageType = "user" | "system";

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  completed?: boolean;
  newSection?: boolean;
  model?: MistralModelId;
  timestamp?: number;
}

export interface MessageSection {
  id: string;
  messages: Message[];
  isNewSection: boolean;
  isActive?: boolean;
  sectionIndex: number;
}

export interface StreamingWord {
  id: number;
  text: string;
}

// Current active conversation ID
// In a more complex app, this would be managed differently
export const CURRENT_CONVERSATION_ID = "default-conversation";
