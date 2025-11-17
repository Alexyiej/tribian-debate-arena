import { Plus, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";

const mockDebates = [
  { id: 1, title: "Is UBI economically sustainable?", date: "Today" },
  { id: 2, title: "Should AI be regulated?", date: "Yesterday" },
  { id: 3, title: "Climate change solutions debate", date: "2 days ago" },
  { id: 4, title: "Universal healthcare pros and cons", date: "3 days ago" },
  { id: 5, title: "Space exploration funding", date: "1 week ago" },
];

export function Sidebar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
  };

  return (
    <div className="flex h-full flex-col border-r border-sidebar-border bg-sidebar">
      {/* New Debate Button */}
      <div className="p-3">
        <Button className="w-full justify-start gap-2" variant="contrast">
          <Plus className="h-4 w-4" />
          New Debate
        </Button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search debates..."
            className="pl-9 bg-background border-border"
          />
        </div>
      </div>

      {/* Debates List */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          {mockDebates.map((debate) => (
            <button
              key={debate.id}
              className="w-full rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <div className="font-medium truncate text-sidebar-foreground">
                {debate.title}
              </div>
              <div className="text-xs text-muted-foreground">{debate.date}</div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={toggleTheme}
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {isDark ? "Light" : "Dark"} Mode
        </Button>

        <div className="flex items-center gap-2 rounded-xl p-2 hover:bg-sidebar-accent cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-sidebar-foreground truncate">
              User
            </div>
            <div className="text-xs text-muted-foreground">Free Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
