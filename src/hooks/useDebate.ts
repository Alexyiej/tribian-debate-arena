import { useState } from "react";

export type ModelType = "Claude" | "Grok" | "GPT";
export type RoleType = "Opposition" | "Defense" | "Arbiter";

export interface Message {
  model: ModelType;
  role: RoleType;
  content: string;
}

export interface Round {
  id: number;
  messages: Message[];
}

const mockMessages: Record<number, string> = {
  1: "I appreciate the question, but I must firmly oppose this premise. Universal Basic Income, while well-intentioned, presents significant economic challenges that cannot be overlooked. The cost of providing a basic income to every citizen would require massive tax increases or reallocation of existing programs, potentially creating more problems than it solves.",
  2: "I respectfully disagree with the opposition's assessment. UBI represents a necessary evolution in our economic thinking. Studies from pilot programs in Finland and Kenya have shown positive outcomes in reducing poverty and improving mental health. The automation revolution is displacing workers at an unprecedented rate, and UBI provides a safety net that allows people to retrain and pursue meaningful work.",
  3: "Having heard both perspectives, I believe the truth lies in nuanced implementation. UBI is neither a panacea nor a disaster. The key question isn't whether UBI works in theory, but whether we can design a sustainable model. Evidence suggests that targeted UBI programs, perhaps starting with specific demographics or regions, could provide valuable data while managing fiscal risk.",
};

export function useDebate() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [maxRounds] = useState(10);

  const getRoleForModel = (
    roundNumber: number,
    model: ModelType
  ): RoleType => {
    const modelIndex = ["Claude", "Grok", "GPT"].indexOf(model);
    const roleIndex = (modelIndex + (roundNumber - 1)) % 3;
    return ["Opposition", "Defense", "Arbiter"][roleIndex] as RoleType;
  };

  const startRound = (overridePrompt?: string) => {
    if (currentRound > maxRounds) return;

    const newRound: Round = {
      id: currentRound,
      messages: [
        {
          model: "Claude",
          role: getRoleForModel(currentRound, "Claude"),
          content: mockMessages[1] || "This is a mock response from Claude.",
        },
        {
          model: "Grok",
          role: getRoleForModel(currentRound, "Grok"),
          content: mockMessages[2] || "This is a mock response from Grok.",
        },
        {
          model: "GPT",
          role: getRoleForModel(currentRound, "GPT"),
          content: mockMessages[3] || "This is a mock response from GPT.",
        },
      ],
    };

    setRounds([...rounds, newRound]);
    setCurrentRound(currentRound + 1);
    if (overridePrompt !== undefined) {
      setPrompt(overridePrompt);
    }
  };

  const getRotationText = () => {
    const models: ModelType[] = ["Claude", "Grok", "GPT"];
    const rotation = models.map(
      (m) => `${m.charAt(0)}:${getRoleForModel(currentRound, m).charAt(0)}`
    );
    return rotation.join(" → ");
  };

  return {
    rounds,
    currentRound,
    maxRounds,
    prompt,
    setPrompt,
    startRound,
    getRotationText,
    getRoleForModel,
  };
}
