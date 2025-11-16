import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Round } from "@/hooks/useDebate";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Swords, Shield, Scale } from "lucide-react";

interface BattleArenaProps {
  prompt: string;
  rounds: Round[];
}

const modelInfo = {
  Claude: { color: "from-orange-500 to-red-500", bgClass: "bg-orange-500" },
  Grok: { color: "from-blue-500 to-cyan-500", bgClass: "bg-blue-500" },
  GPT: { color: "from-green-500 to-emerald-500", bgClass: "bg-green-500" },
};

const roleIcons = {
  Opposition: Swords,
  Defense: Shield,
  Arbiter: Scale,
};

const roleGradients = {
  Opposition: "from-red-500 to-pink-500",
  Defense: "from-blue-500 to-indigo-500",
  Arbiter: "from-green-500 to-teal-500",
};

export function BattleArena({ prompt, rounds }: BattleArenaProps) {
  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Battle Title */}
        {prompt && (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-8 border-2 border-primary/30">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3">
                <Swords className="h-3 w-3" />
                ACTIVE BATTLE
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {prompt}
              </h1>
              <p className="text-muted-foreground">
                {rounds.length} rounds completed • 3 AI combatants
              </p>
            </div>
          </div>
        )}

        {/* Rounds */}
        {rounds.map((round) => {
          const opposition = round.messages.find((m) => m.role === "Opposition");
          const defense = round.messages.find((m) => m.role === "Defense");
          const arbiter = round.messages.find((m) => m.role === "Arbiter");

          return (
            <div key={round.id} className="space-y-6">
              {/* Round Header */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-xl opacity-50" />
                  <div className="relative px-8 py-3 rounded-full bg-card border-2 border-primary shadow-lg">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      ROUND {round.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Battle Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Opposition vs Defense */}
                <div className="space-y-6">
                  {/* Opposition */}
                  {opposition && (
                    <Card className="group relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-card p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] animate-fade-in">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent blur-2xl" />
                      
                      <div className="relative space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-red-500 ring-4 ring-red-500/20">
                            <AvatarFallback className={`${modelInfo[opposition.model].bgClass} text-white font-bold text-lg`}>
                              {opposition.model.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="font-bold text-lg text-foreground">
                              {opposition.model}
                            </div>
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                              <Swords className="h-3 w-3 mr-1" />
                              Opposition
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-card-foreground">
                          {opposition.content}
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* Defense */}
                  {defense && (
                    <Card className="group relative overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-card p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] animate-fade-in">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent blur-2xl" />
                      
                      <div className="relative space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-blue-500 ring-4 ring-blue-500/20">
                            <AvatarFallback className={`${modelInfo[defense.model].bgClass} text-white font-bold text-lg`}>
                              {defense.model.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="font-bold text-lg text-foreground">
                              {defense.model}
                            </div>
                            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0">
                              <Shield className="h-3 w-3 mr-1" />
                              Defense
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm leading-relaxed text-card-foreground">
                          {defense.content}
                        </p>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Arbiter - Full Height */}
                {arbiter && (
                  <Card className="group relative overflow-hidden rounded-2xl border-2 border-green-500/30 bg-card p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] animate-fade-in md:row-span-2">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent blur-2xl" />
                    
                    <div className="relative space-y-4 h-full flex flex-col">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-green-500 ring-4 ring-green-500/20">
                          <AvatarFallback className={`${modelInfo[arbiter.model].bgClass} text-white font-bold text-lg`}>
                            {arbiter.model.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="font-bold text-lg text-foreground">
                            {arbiter.model}
                          </div>
                          <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
                            <Scale className="h-3 w-3 mr-1" />
                            Arbiter
                          </Badge>
                        </div>
                      </div>

                      <div className="flex-1 flex items-center">
                        <p className="text-sm leading-relaxed text-card-foreground">
                          {arbiter.content}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {rounds.length === 0 && !prompt && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary blur-2xl opacity-30 animate-pulse" />
                <Swords className="relative h-24 w-24 text-primary" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Enter the Battle Arena
              </h2>
              <p className="text-muted-foreground max-w-md">
                Choose your debate topic and watch three AI models battle it out
                with arguments, defenses, and verdicts
              </p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
