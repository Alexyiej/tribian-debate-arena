import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CreditCard,
  MessageSquare,
  Palette,
  Database,
  Mail,
  Lock,
  Shield,
  LogOut,
  Trash2,
  Download,
  Upload,
} from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Section = "account" | "subscription" | "chat" | "interface" | "data";

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState<Section>("account");

  const sections = [
    { id: "account" as Section, label: "Konto", icon: User },
    { id: "subscription" as Section, label: "Subskrypcja", icon: CreditCard },
    { id: "chat" as Section, label: "Chat / Debaty", icon: MessageSquare },
    { id: "interface" as Section, label: "Interfejs", icon: Palette },
    { id: "data" as Section, label: "Dane", icon: Database },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <div className="flex h-full">
          {/* Left Sidebar Navigation */}
          <div className="w-64 border-r border-border bg-muted/30 p-4">
            <DialogHeader className="px-2 pb-4">
              <DialogTitle className="text-xl">Ustawienia</DialogTitle>
            </DialogHeader>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {activeSection === "account" && <AccountSection />}
              {activeSection === "subscription" && <SubscriptionSection />}
              {activeSection === "chat" && <ChatSection />}
              {activeSection === "interface" && <InterfaceSection />}
              {activeSection === "data" && <DataSection />}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AccountSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Konto</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input id="email" type="email" placeholder="user@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Hasło
            </Label>
            <Button variant="outline" className="w-full justify-start">
              Zmień hasło
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Uwierzytelnianie dwuskładnikowe (2FA)
            </Label>
            <Button variant="outline" className="w-full justify-start">
              Włącz 2FA
            </Button>
          </div>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Wyloguj
          </Button>

          <Button variant="destructive" className="w-full justify-start gap-2">
            <Trash2 className="h-4 w-4" />
            Usuń konto
          </Button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Subskrypcja</h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Aktualny plan</span>
              <span className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-full">
                Free Plan
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Bezpłatny dostęp z podstawowymi funkcjami
            </p>
          </div>

          <div className="space-y-2">
            <Label>Limity</Label>
            <div className="p-3 border border-border rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Debaty dziennie:</span>
                <span className="font-medium">10 / 10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wiadomości:</span>
                <span className="font-medium">50 / 100</span>
              </div>
            </div>
          </div>

          <Button className="w-full">Zmień plan</Button>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Historia płatności
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Faktury
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Chat / Debaty</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chat-language">Język rozmowy</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="chat-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Wykryj automatycznie</SelectItem>
                <SelectItem value="pl">Polski</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="response-style">Styl odpowiedzi</Label>
            <Select defaultValue="balanced">
              <SelectTrigger id="response-style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Kompaktowy</SelectItem>
                <SelectItem value="balanced">Zbalansowany</SelectItem>
                <SelectItem value="detailed">Szczegółowy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-model">Domyślny model</Label>
            <Select defaultValue="gpt4">
              <SelectTrigger id="default-model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt4">GPT-4</SelectItem>
                <SelectItem value="gpt35">GPT-3.5</SelectItem>
                <SelectItem value="claude">Claude</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-rounds">Domyślne rundy dla debat</Label>
            <Select defaultValue="5">
              <SelectTrigger id="default-rounds">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 rundy</SelectItem>
                <SelectItem value="5">5 rund</SelectItem>
                <SelectItem value="10">10 rund</SelectItem>
                <SelectItem value="custom">Niestandardowe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ustawienia prywatności</Label>
              <p className="text-sm text-muted-foreground">
                Zarządzaj prywatnością swoich debat
              </p>
            </div>
            <Switch />
          </div>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full justify-start gap-2">
            <Trash2 className="h-4 w-4" />
            Usuń wszystkie czaty / debaty
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2">
            <Download className="h-4 w-4" />
            Archiwizuj wszystko
          </Button>
        </div>
      </div>
    </div>
  );
}

function InterfaceSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Interfejs</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="app-language">Język aplikacji</Label>
            <Select defaultValue="pl">
              <SelectTrigger id="app-language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pl">Polski</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Motyw</Label>
            <Select defaultValue="auto">
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Jasny</SelectItem>
                <SelectItem value="dark">Ciemny</SelectItem>
                <SelectItem value="auto">Automatyczny</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Animacje</Label>
              <p className="text-sm text-muted-foreground">
                Włącz lub wyłącz animacje interfejsu
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tryb kompaktowy</Label>
              <p className="text-sm text-muted-foreground">
                Zmniejsz odstępy w interfejsie
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}

function DataSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dane</h3>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Download className="h-4 w-4" />
            Eksportuj dane
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2">
            <Upload className="h-4 w-4" />
            Importuj dane
          </Button>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Zgoda na trenowanie modeli</Label>
              <p className="text-sm text-muted-foreground">
                Pozwól na wykorzystanie Twoich danych do trenowania
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Użycie danych feedback</Label>
              <p className="text-sm text-muted-foreground">
                Udostępniaj dane o opiniach do analiz
              </p>
            </div>
            <Switch />
          </div>

          <div className="p-4 border border-border rounded-lg bg-muted/50 mt-6">
            <p className="text-sm text-muted-foreground">
              Twoje dane są chronione zgodnie z naszą polityką prywatności. 
              Masz pełną kontrolę nad tym, jak Twoje informacje są wykorzystywane.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
