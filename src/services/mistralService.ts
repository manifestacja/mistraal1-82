
import { AIModel, MistralModelId } from "@/types/models";

const MODELS: AIModel[] = [
  {
    id: "mistral-small-latest",
    name: "Mistral Small",
    description: "Standardowy model, dobry do codziennych zadań",
    apiKey: "HSYrLn4rxeZ5ee1jeTJt6lziBKFdNIz4"
  },
  {
    id: "mistral-large-latest",
    name: "Mistral Large",
    description: "Zaawansowany model, najlepszy do złożonych zadań",
    apiKey: "UFGm0oS6sCSgjJiyDGL5jdaqYkw12rwW"
  }
];

export const getMistralModels = (): AIModel[] => {
  return MODELS;
};

export const getMistralModel = (id: MistralModelId): AIModel | undefined => {
  return MODELS.find(model => model.id === id);
};

export const generateMistralResponse = async (
  prompt: string, 
  modelId: MistralModelId
): Promise<string> => {
  const model = getMistralModel(modelId);
  
  if (!model) {
    throw new Error(`Model ${modelId} not found`);
  }

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${model.apiKey}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Mistral API error:", errorData);
      throw new Error(`Błąd API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Mistral API:", error);
    throw new Error("Nie udało się połączyć z API Mistral");
  }
};
