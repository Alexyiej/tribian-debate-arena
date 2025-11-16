import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Swords, Shield, Scale } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface InputBarProps {
  currentRound: number;
  maxRounds: number;
  rotationText: string;
  onStartRound: (prompt: string) => void;
  disabled?: boolean;
  modelRoles?: { model: string; role: string }[];
}

const modelInfo: Record<string, { color: string; initial: string }> = {
  Claude: { color: "bg-orange-500", initial: "C" },
  Grok: { color: "bg-blue-500", initial: "G" },
  GPT: { color: "bg-green-500", initial: "P" },
};

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
        <div className="mb-4 space-y-3">
          {/* Round Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium">
                  Runda {Math.min(currentRound, maxRounds)} z {maxRounds}
                </span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((Math.min(currentRound - 1, maxRounds) / maxRounds) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(Math.min(currentRound - 1, maxRounds) / maxRounds) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Roles */}
          {modelRoles.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Obecna kolejka:</span>
              <div className="flex gap-2">
                {modelRoles.map(({ model, role }) => {
                  const RoleIcon = roleInfo[role]?.icon;
                  return (
                    <div
                      key={model}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-card border border-border"
                    >
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className={`${modelInfo[model]?.color} text-white text-[8px]`}>
                          {modelInfo[model]?.initial}
                        </AvatarFallback>
                      </Avatar>
                      {RoleIcon && <RoleIcon className={`h-3 w-3 ${roleInfo[role]?.color}`} />}
                      <span className="text-[10px] font-medium">{roleInfo[role]?.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
