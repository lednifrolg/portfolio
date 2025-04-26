import { TerminalLineProps } from './types';
import { CSS_CLASSES } from './constants';

/**
 * Component for rendering a single line in the terminal
 */
export function TerminalLine({
  line,
  index,
  displayText,
  currentLine,
  currentChar,
  terminalText,
}: TerminalLineProps) {
  // Determine if this line should show the cursor
  const shouldShowCursor =
    index === displayText.length - 1 &&
    currentLine < terminalText.length &&
    typeof terminalText[currentLine] === 'string' &&
    currentChar === (terminalText[currentLine] as string).length;

  // Render different types of lines
  if (typeof line === 'string') {
    // Command line (starts with $)
    if (line.startsWith('$ ')) {
      return (
        <pre className={CSS_CLASSES.terminalLine} role="text">
          <code>
            <span className={CSS_CLASSES.commandPrompt} aria-hidden="true">$</span>
            <span aria-label={`Command: ${line.substring(2)}`}>{line.substring(1)}</span>
          </code>
          {shouldShowCursor && <span className={CSS_CLASSES.cursor} aria-hidden="true">_</span>}
        </pre>
      );
    }
    // Regular text line
    return (
      <pre className={CSS_CLASSES.terminalLine} role="text">
        <code>{line}</code>
        {shouldShowCursor && <span className={CSS_CLASSES.cursor} aria-hidden="true">_</span>}
      </pre>
    );
  }

  // Object with content (like contact info)
  if (line && typeof line === 'object' && 'content' in line) {
    return (
      <article className={CSS_CLASSES.terminalLine}>
        {line.content}
        {shouldShowCursor && <span className={CSS_CLASSES.cursor} aria-hidden="true">_</span>}
      </article>
    );
  }

  // Fallback for empty or invalid lines
  return null;
}
