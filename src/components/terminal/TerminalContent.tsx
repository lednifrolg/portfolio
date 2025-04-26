import { useMemo } from 'react';
import { TerminalContentProps } from './types';
import { CSS_CLASSES } from './constants';
import { TerminalLine } from './TerminalLine';

/**
 * Component for rendering the terminal content area
 */
export function TerminalContent({
  displayText,
  currentLine,
  currentChar,
  terminalText,
  isTypingComplete,
}: TerminalContentProps) {
  // Render terminal lines
  const renderedTerminalLines = useMemo(() => {
    return displayText.map((line, index) => (
      <TerminalLine
        key={index}
        line={line}
        index={index}
        displayText={displayText}
        currentLine={currentLine}
        currentChar={currentChar}
        terminalText={terminalText}
      />
    ));
  }, [displayText, currentLine, currentChar, terminalText]);

  return (
    <section 
      className={CSS_CLASSES.terminalContent}
      aria-live="polite"
      aria-label="Terminal output"
    >
      {renderedTerminalLines}
      {isTypingComplete && <span className={CSS_CLASSES.cursor} aria-hidden="true">_</span>}
    </section>
  );
}
