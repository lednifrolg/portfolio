import { createContext } from 'react';

interface AppState {
  isTerminalVisible: boolean;
  isBootupComplete: boolean;
  setIsTerminalVisible: (value: boolean) => void;
  setIsBootupComplete: (value: boolean) => void;
  handleBootupStart: () => void;
  handleBootupComplete: () => void;
}

export const AppStateContext = createContext<AppState | undefined>(undefined);
