import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useState } from "react";

interface InputBarProps {
  currentRound: number;
  maxRounds: number;
  rotationText: string;
  onStartRound: (prompt: string) => void;
  disabled?: boolean;
}

export function InputBar({
  currentRound,
  maxRounds,
  rotationText,
  onStartRound,
  disabled = false,
}: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim() && currentRound === 1) return;
    onStartRound(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isFirstRound = currentRound === 1;
  const isComplete = currentRound > maxRounds;

  return (
    <div className="sticky bottom-0 border-t border-border bg-background shadow-lg">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
          <span>
            Round {Math.min(currentRound, maxRounds)} / {maxRounds}
          </span>
          <span className="font-mono">{rotationText}</span>
        </div>

        <div className="flex gap-2">
          <Textarea
            placeholder={
              isComplete
                ? "Debate complete!"
                : isFirstRound
                ? "Enter your debate topic..."
                : "Optional: Add a comment or override..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isComplete}
            className="min-h-[60px] max-h-[200px] resize-none rounded-xl border-border bg-input"
          />
          <Button
            onClick={handleSubmit}
            disabled={disabled || isComplete || (isFirstRound && !input.trim())}
            size="icon"
            className="shrink-0 h-[60px] w-[60px] rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {isComplete && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Maximum rounds reached. Start a new debate to continue.
          </p>
        )}
      </div>
    </div>
  );
}
