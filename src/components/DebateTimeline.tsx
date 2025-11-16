import { Round } from "@/hooks/useDebate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Swords, Shield, Scale } from "lucide-react";

interface DebateTimelineProps {
  rounds: Round[];
  currentRound: number;
}

const modelInfo = {
  Claude: { color: "bg-orange-500" },
  Grok: { color: "bg-blue-500" },
  GPT: { color: "bg-green-500" },
};

const roleInfo = {
  Opposition: { icon: Swords, color: "bg-red-500" },
  Defense: { icon: Shield, color: "bg-blue-500" },
  Arbiter: { icon: Scale, color: "bg-green-500" },
};

export function DebateTimeline({ rounds, currentRound }: DebateTimelineProps) {
  return (
    <div className="hidden xl:flex w-72 border-l border-border bg-card flex-col">
      <div className="border-b border-border p-4">
        <h3 className="font-semibold text-sm">Timeline</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Runda {currentRound} • {rounds.reduce((sum, r) => sum + r.messages.length, 0)} odpowiedzi
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {rounds.map((round) => (
            <div key={round.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{round.id}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  Round {round.id}
                </span>
              </div>
              
              <div className="space-y-2 ml-3 pl-3 border-l-2 border-border">
                {round.messages.map((message, idx) => {
                  const wordCount = message.content.split(/\s+/).length;
                  const lineWidth = Math.min(Math.max(wordCount * 0.8, 40), 200);
                  const RoleIcon = roleInfo[message.role].icon;
                  
                  return (
                    <div key={idx} className="group space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5 border border-border">
                          <AvatarFallback className={`${modelInfo[message.model].color} text-white text-[10px]`}>
                            {message.model.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{message.model}</span>
                        <RoleIcon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      
                      <div className="relative">
                        <div
                          className={`h-1 rounded-full ${roleInfo[message.role].color} transition-all group-hover:h-1.5`}
                          style={{ width: `${lineWidth}px` }}
                        />
                        <span className="text-[10px] text-muted-foreground absolute left-0 -bottom-4">
                          {wordCount} słów
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
