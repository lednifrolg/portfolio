import { TerminalHeaderProps } from './types';
import { CSS_CLASSES } from './constants';

/**
 * Terminal header component with window buttons and title
 */
export function TerminalHeader({ title }: TerminalHeaderProps) {
  return (
    <header className={CSS_CLASSES.terminalHeader}>
      <div 
        className={`${CSS_CLASSES.terminalButton} ${CSS_CLASSES.close}`} 
        role="button" 
        aria-label="Close terminal window"
      ></div>
      <div 
        className={`${CSS_CLASSES.terminalButton} ${CSS_CLASSES.minimize}`} 
        role="button" 
        aria-label="Minimize terminal window"
      ></div>
      <div 
        className={`${CSS_CLASSES.terminalButton} ${CSS_CLASSES.maximize}`} 
        role="button" 
        aria-label="Maximize terminal window"
      ></div>
      <h1 className={CSS_CLASSES.terminalTitle}>{title}</h1>
    </header>
  );
}
