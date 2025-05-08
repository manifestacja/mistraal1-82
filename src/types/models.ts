
export type MistralModelId = "mistral-small-latest" | "mistral-large-latest";

export interface AIModel {
  id: MistralModelId;
  name: string;
  description: string;
  apiKey: string;
}

export interface AIModelResponse {
  content: string;
  model: MistralModelId;
}
