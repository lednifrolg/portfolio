import { memo } from 'react';
import { TerminalProps } from './types';
import { CSS_CLASSES, TERMINAL_TITLE } from './constants';
import { terminalText } from './terminalData';
import { useTypingAnimation } from './useTypingAnimation';
import { TerminalHeader } from './TerminalHeader';
import { TerminalContent } from './TerminalContent';

/**
 * Terminal component that displays a terminal-like interface with typing animation
 */
function Terminal({ isBootupInProgress = false, shouldStartTyping }: TerminalProps) {
  // Use the typing animation hook
  const { displayText, currentLine, currentChar, isTypingComplete } = useTypingAnimation(
    terminalText,
    shouldStartTyping
  );

  return (
    <main 
      className={`${CSS_CLASSES.terminal} ${isBootupInProgress ? CSS_CLASSES.terminalDuringBootup : ''}`}
      aria-label="Terminal interface showing Filip Tomasovych's portfolio"
    >
      <TerminalHeader title={TERMINAL_TITLE} />
      <TerminalContent
        displayText={displayText}
        currentLine={currentLine}
        currentChar={currentChar}
        terminalText={terminalText}
        isTypingComplete={isTypingComplete}
      />
    </main>
  );
}

export default memo(Terminal);
export { type TerminalLine } from './types';
