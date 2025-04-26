import { ReactNode, useState, useCallback } from 'react';
import { AppStateContext } from './AppStateContext';

interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isBootupComplete, setIsBootupComplete] = useState(false);

  const handleBootupStart = useCallback(() => {
    setIsTerminalVisible(true);
  }, []);

  const handleBootupComplete = useCallback(() => {
    setIsBootupComplete(true);
  }, []);

  const value = {
    isTerminalVisible,
    isBootupComplete,
    setIsTerminalVisible,
    setIsBootupComplete,
    handleBootupStart,
    handleBootupComplete,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
