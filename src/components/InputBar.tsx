import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Swords, Shield, Scale, Paperclip, ChevronDown, Square } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InputBarProps {
  currentRound: number;
  maxRounds: number;
  rotationText: string;
  onStartRound: (prompt: string) => void;
  disabled?: boolean;
  modelRoles?: { model: string; role: string }[];
  mode?: "single" | "triple";
  onModeChange?: (mode: "single" | "triple") => void;
}

const modelInfo: Record<string, { color: string; initial: string; icon: any; label: string }> = {
  Claude: { color: "bg-red-500", initial: "C", icon: Swords, label: "Claude" },
  Grok: { color: "bg-blue-500", initial: "G", icon: Shield, label: "Grok" },
  GPT: { color: "bg-green-500", initial: "P", icon: Scale, label: "GPT" },
};

const modelOptions = [
  { value: "grok-4.1", label: "grok-4.1 fast non-reasoning" },
  { value: "grok-4", label: "grok-4 reasoning" },
  { value: "claude-3.5", label: "claude-3.5 sonnet" },
  { value: "gpt-4", label: "gpt-4 turbo" },
];

const roleInfo: Record<string, { icon: any; color: string; label: string }> = {
  Opposition: { icon: Swords, color: "text-red-500", label: "Opp" },
  Defense: { icon: Shield, color: "text-blue-500", label: "Def" },
  Arbiter: { icon: Scale, color: "text-green-500", label: "Arb" },
};

export function InputBar({
  currentRound,
  maxRounds,
  rotationText,
  onStartRound,
  disabled = false,
  modelRoles = [],
  mode = "single",
  onModeChange,
}: InputBarProps) {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].value);
  const [isGenerating, setIsGenerating] = useState({
    Claude: false,
    Grok: false,
    GPT: false,
  });

  const handleSubmit = () => {
    if (!input.trim() && currentRound === 1) return;
    if (mode === "triple") {
      setIsGenerating({ Claude: true, Grok: true, GPT: true });
    }
    onStartRound(input);
    setInput("");
  };

  const handleStop = (model: "Claude" | "Grok" | "GPT") => {
    setIsGenerating(prev => ({ ...prev, [model]: false }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isFirstRound = currentRound === 1;
  const isComplete = currentRound > maxRounds;

  const selectedModelLabel = modelOptions.find(m => m.value === selectedModel)?.label || selectedModel;

  return (
    <div className="sticky bottom-0 border-t border-border bg-background shadow-lg">
      <div className="mx-auto max-w-4xl px-4 py-4">
        {mode === "single" && (
          <>
            {/* Single Model Mode */}
            <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-2 shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-10 w-10 rounded-xl hover:bg-accent"
            >
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled || isComplete}
              className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="shrink-0 h-10 px-3 rounded-xl hover:bg-accent text-sm text-muted-foreground gap-1"
                >
                  {selectedModelLabel}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {modelOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSelectedModel(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={handleSubmit}
              disabled={disabled || isComplete || !input.trim()}
              size="icon"
              className="shrink-0 h-10 w-10 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Toggle Mode Button */}
          <div className="flex justify-center mt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onModeChange?.("triple")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Switch to Triple Mode
            </Button>
          </div>
        </>
        )}

        {mode === "triple" && (
          <>
            {/* Triple Model Mode */}
            <div className="space-y-3">
            <div className="flex items-start gap-3 bg-card border border-border rounded-2xl p-3 shadow-sm">
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-10 w-10 rounded-xl hover:bg-accent mt-1"
              >
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </Button>
              
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled || isComplete}
                className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground flex-1"
              />

              <div className="flex items-center gap-2 shrink-0">
                {/* Claude */}
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-background border border-border">
                  <Swords className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-medium">Claude</span>
                  {isGenerating.Claude && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStop("Claude")}
                      className="h-6 w-6 ml-1 hover:bg-accent"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {/* Grok */}
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-background border border-border">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium">Grok</span>
                  {isGenerating.Grok && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStop("Grok")}
                      className="h-6 w-6 ml-1 hover:bg-accent"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {/* GPT */}
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-background border border-border">
                  <Scale className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-medium">GPT</span>
                  {isGenerating.GPT && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStop("GPT")}
                      className="h-6 w-6 ml-1 hover:bg-accent"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={disabled || isComplete || !input.trim()}
                  size="icon"
                  className="shrink-0 h-10 w-10 rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Toggle Mode Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onModeChange?.("single")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Switch to Single Mode
              </Button>
            </div>
          </div>
        </>
        )}
      </div>
    </div>
  );
}
