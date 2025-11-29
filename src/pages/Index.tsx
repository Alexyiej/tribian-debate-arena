import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { BattleArena } from "@/components/BattleArena";
import { InputBar } from "@/components/InputBar";
import { DebateTimeline } from "@/components/DebateTimeline";
import { useDebate } from "@/hooks/useDebate";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputMode, setInputMode] = useState<"single" | "triple">("single");
  const {
    rounds,
    currentRound,
    maxRounds,
    prompt,
    setPrompt,
    startRound,
    getRotationText,
    getCurrentModelRoles,
  } = useDebate();

  const handleStartRound = (input: string) => {
    if (currentRound === 1 && input.trim()) {
      setPrompt(input);
    }
    startRound(input);
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <TopNav onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 border-r border-sidebar-border">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-80 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <BattleArena prompt={prompt} rounds={rounds} />
            </div>
            <InputBar
              currentRound={currentRound}
              maxRounds={maxRounds}
              rotationText={getRotationText()}
              onStartRound={handleStartRound}
              modelRoles={getCurrentModelRoles()}
              mode={inputMode}
              onModeChange={setInputMode}
            />
          </div>

          {/* Timeline - Desktop Only */}
          <DebateTimeline rounds={rounds} currentRound={currentRound} />
        </div>
      </div>
    </div>
  );
};

export default Index;
