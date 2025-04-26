import { cloneElement, useEffect, useState, ReactElement } from 'react';
import { TerminalLine, UseTypingAnimationReturn } from './types';
import { TYPING_SPEED } from './constants';

/**
 * Custom hook for handling the typing animation in the terminal
 *
 * @param terminalText - The text to be typed
 * @param shouldStartTyping - Whether the typing animation should start
 * @returns Object containing the current state of the typing animation
 */
export function useTypingAnimation(
  terminalText: TerminalLine[],
  shouldStartTyping: boolean
): UseTypingAnimationReturn {
  const [displayText, setDisplayText] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!shouldStartTyping) return;

    if (currentLine < terminalText.length) {
      const timer = setTimeout(() => {
        const currentLineContent = terminalText[currentLine];

        // Handle string content
        if (typeof currentLineContent === 'string') {
          if (currentChar < currentLineContent.length) {
            // Type the next character
            setDisplayText(prev => {
              const newLines = [...prev];
              if (newLines.length <= currentLine) {
                newLines.push('');
              }
              newLines[currentLine] = currentLineContent.substring(0, currentChar + 1);
              return newLines;
            });
            setCurrentChar(currentChar + 1);
          } else {
            // Move to the next line
            setCurrentLine(currentLine + 1);
            setCurrentChar(0);
          }
        } else if (
          typeof currentLineContent === 'object' &&
          'type' in currentLineContent &&
          currentLineContent.type === 'contact'
        ) {
          // Handle contact content with animation
          const contactContent = currentLineContent.content;

          // Clone the contact element with an updated currentChar prop
          const updatedContactContent = cloneElement(
            contactContent as ReactElement<{ currentChar?: number; isAnimating?: boolean }>,
            {
              currentChar,
            }
          );

          // Update the display text with the updated contact content
          setDisplayText(prev => {
            const newLines = [...prev];
            newLines[currentLine] = {
              ...currentLineContent,
              content: updatedContactContent,
            };
            return newLines;
          });

          // Increment the character count for animation
          setCurrentChar(currentChar + 1);

          // Move to the next line when animation is complete (arbitrary length of 100 characters)
          if (currentChar >= 100) {
            setCurrentLine(currentLine + 1);
            setCurrentChar(0);
          }
        } else {
          // Handle other non-string content (like React nodes)
          setDisplayText(prev => {
            const newLines = [...prev];
            newLines[currentLine] = currentLineContent;
            return newLines;
          });
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }
      }, TYPING_SPEED);

      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentLine, currentChar, shouldStartTyping, terminalText]);

  return {
    displayText,
    currentLine,
    currentChar,
    isTypingComplete,
  };
}
