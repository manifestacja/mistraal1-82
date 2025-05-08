
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MistralModelId } from "@/types/models";
import { getMistralModels } from "@/services/mistralService";

interface ModelSelectorProps {
  selectedModel: MistralModelId;
  onModelChange: (model: MistralModelId) => void;
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const models = getMistralModels();
  const selectedModelName = models.find(model => model.id === selectedModel)?.name || selectedModel;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 rounded-full border-0 bg-transparent">
          {selectedModelName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {models.map((model) => (
          <DropdownMenuItem 
            key={model.id} 
            onClick={() => onModelChange(model.id)}
            className="text-sm cursor-pointer"
          >
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
