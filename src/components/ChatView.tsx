import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Round, RoleType } from "@/hooks/useDebate";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatViewProps {
  prompt: string;
  rounds: Round[];
}

const modelColors: Record<string, string> = {
  Claude: "bg-orange-500",
  Grok: "bg-blue-500",
  GPT: "bg-green-500",
};

const roleColors: Record<RoleType, string> = {
  Opposition: "border-red-500 text-red-500",
  Defense: "border-blue-500 text-blue-500",
  Arbiter: "border-green-500 text-green-500",
};

export function ChatView({ prompt, rounds }: ChatViewProps) {
  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Prompt Display */}
        {prompt && (
          <div className="rounded-xl bg-muted p-4 border border-border">
            <div className="text-xs font-semibold text-muted-foreground mb-1">
              Debate Topic
            </div>
            <div className="text-lg font-medium text-foreground">{prompt}</div>
          </div>
        )}

        {/* Rounds */}
        {rounds.map((round) => (
          <div key={round.id} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <div className="text-sm font-semibold text-muted-foreground">
                Round {round.id}
              </div>
              <div className="h-px flex-1 bg-border" />
            </div>

            {round.messages.map((message, idx) => (
              <Card
                key={idx}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback
                      className={`${
                        modelColors[message.model]
                      } text-white text-xs font-semibold`}
                    >
                      {message.model.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-card-foreground">
                        {message.model}
                      </span>
                      <Badge
                        variant="outline"
                        className={`${roleColors[message.role]} text-xs`}
                      >
                        {message.role}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-card-foreground">
                      {message.content}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}

        {/* Empty State */}
        {rounds.length === 0 && !prompt && (
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Start a New Debate
              </h2>
              <p className="text-muted-foreground">
                Enter a topic below to begin a three-way AI debate
              </p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
