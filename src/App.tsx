import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { ChatView } from "@/components/ChatView";
import { InputBar } from "@/components/InputBar";
import { useDebate } from "@/hooks/useDebate";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    rounds,
    currentRound,
    maxRounds,
    prompt,
    setPrompt,
    startRound,
    getRotationText,
  } = useDebate();

  const handleStartRound = (input: string) => {
    if (currentRound === 1 && input.trim()) {
      setPrompt(input);
    }
    startRound(input);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <ChatView prompt={prompt} rounds={rounds} />
              </div>
              <InputBar
                currentRound={currentRound}
                maxRounds={maxRounds}
                rotationText={getRotationText()}
                onStartRound={handleStartRound}
              />
            </div>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
