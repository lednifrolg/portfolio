import { ReactNode } from 'react';

export type TerminalLine = string | { type: 'contact'; content: ReactNode };

export interface TerminalProps {
  isBootupInProgress: boolean;
  shouldStartTyping: boolean;
}

export interface TerminalHeaderProps {
  title: string;
}

export interface TerminalContentProps {
  displayText: TerminalLine[];
  currentLine: number;
  currentChar: number;
  terminalText: TerminalLine[];
  isTypingComplete: boolean;
}

export interface TerminalLineProps {
  line: TerminalLine;
  index: number;
  displayText: TerminalLine[];
  currentLine: number;
  currentChar: number;
  terminalText: TerminalLine[];
}

export interface ContactLinksProps {
  currentChar?: number;
  isAnimating?: boolean;
}

export interface UseTypingAnimationReturn {
  displayText: TerminalLine[];
  currentLine: number;
  currentChar: number;
  isTypingComplete: boolean;
}
