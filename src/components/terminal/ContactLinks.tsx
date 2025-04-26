import { useMemo } from 'react';
import { ContactLinksProps } from './types';
import { CSS_CLASSES } from './constants';

const contactData = [
  {
    icon: '@',
    iconClass: CSS_CLASSES.emailIcon,
    label: 'Email: ',
    link: 'mailto:filip.tomasovych@email.com',
    text: 'filip.tomasovych@email.com',
  },
  {
    icon: '⌨',
    iconClass: CSS_CLASSES.githubIcon,
    useIconGlyph: true,
    label: 'GitHub: ',
    link: 'https://github.com/lednifrolg',
    text: 'github.com/lednifrolg',
  },
  {
    icon: '⊡',
    iconClass: CSS_CLASSES.linkedinIcon,
    label: 'LinkedIn: ',
    link: 'https://linkedin.com/in/filip-tomasovych/',
    text: 'linkedin.com/in/filip-tomasovych/',
  },
];

/**
 * Component for rendering contact links in the terminal
 */
export function ContactLinks({ currentChar = Infinity, isAnimating = false }: ContactLinksProps) {
  useMemo(() => {
    return contactData.reduce((total, item) => {
      const iconLength = item.useIconGlyph ? 1 : item.icon.length;
      const labelLength = item.label.length;
      const textLength = item.text.length;
      return total + iconLength + labelLength + textLength + 1; // +1 for spacing/newline
    }, 0);
  }, []);
  const renderContactItems = useMemo(() => {
    let charCount = 0;

    return contactData
      .map((item, index) => {
        const isIconVisible = charCount < currentChar;
        charCount += item.useIconGlyph ? 1 : item.icon.length;

        const isLabelVisible = charCount < currentChar;
        const labelVisibleChars = isLabelVisible
          ? Math.min(item.label.length, currentChar - (charCount - item.label.length))
          : 0;
        charCount += item.label.length;

        const isTextVisible = charCount < currentChar;
        const textVisibleChars = isTextVisible
          ? Math.min(item.text.length, currentChar - (charCount - item.text.length))
          : 0;
        charCount += item.text.length + 1; // +1 for spacing/newline

        // Only render this contact item if at least the icon is visible
        if (!isIconVisible && isAnimating) {
          return null;
        }

        return (
          <li key={index} className={CSS_CLASSES.contactItem}>
            {isIconVisible && (
              <span className={`${CSS_CLASSES.contactIcon} ${item.iconClass}`} aria-hidden="true">
                {item.useIconGlyph ? (
                  <span className={CSS_CLASSES.iconGlyph}>{item.icon}</span>
                ) : (
                  item.icon
                )}
              </span>
            )}

            {isLabelVisible && (
              <span aria-hidden="true">{item.label.substring(0, labelVisibleChars)}</span>
            )}

            {isTextVisible && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={CSS_CLASSES.contactLink}
                aria-label={`${item.label.trim()} ${item.text}`}
              >
                {item.text.substring(0, textVisibleChars)}
              </a>
            )}
          </li>
        );
      })
      .filter(Boolean);
  }, [currentChar, isAnimating]);

  return (
    <nav aria-label="Contact information">
      <ul className={CSS_CLASSES.contactLinks}>{renderContactItems}</ul>
    </nav>
  );
}
