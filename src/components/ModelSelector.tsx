
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MistralModelId } from "@/types/models";
import { getMistralModels } from "@/services/mistralService";

interface ModelSelectorProps {
  selectedModel: MistralModelId;
  onModelChange: (model: MistralModelId) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const models = getMistralModels();

  return (
    <Select 
      value={selectedModel} 
      onValueChange={(value) => onModelChange(value as MistralModelId)}
    >
      <SelectTrigger className="w-[180px] rounded-full border-gray-200 h-8 text-sm">
        <SelectValue placeholder="Wybierz model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id} className="text-sm">
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
