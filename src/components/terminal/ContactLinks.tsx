import { useMemo } from 'react';
import { ContactLinksProps } from './types';
import { CSS_CLASSES } from './constants';

const contactData = [
  {
    icon: '@',
    iconClass: CSS_CLASSES.emailIcon,
    label: 'Email: ',
    link: 'mailto:filip.tomasovych@gmail.com',
    text: 'filip.tomasovych@gmail.com',
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

// Character offsets are static (derived only from contactData), so precompute them once
// instead of mutating a running counter during render. `iconStart`/`labelStart`/`textStart`
// are the cumulative character positions at which each segment begins revealing.
const contactItems = contactData.reduce<
  Array<{
    item: (typeof contactData)[number];
    iconStart: number;
    labelStart: number;
    textStart: number;
  }>
>((acc, item) => {
  const prev = acc.length > 0 ? acc[acc.length - 1] : null;
  const iconStart = prev ? prev.textStart + prev.item.text.length + 1 : 0; // +1 for spacing/newline
  const labelStart = iconStart + (item.useIconGlyph ? 1 : item.icon.length);
  const textStart = labelStart + item.label.length;
  return [...acc, { item, iconStart, labelStart, textStart }];
}, []);

/**
 * Component for rendering contact links in the terminal
 */
export function ContactLinks({ currentChar = Infinity, isAnimating = false }: ContactLinksProps) {
  const renderContactItems = useMemo(() => {
    return contactItems
      .map(({ item, iconStart, labelStart, textStart }, index) => {
        const isIconVisible = iconStart < currentChar;

        const isLabelVisible = labelStart < currentChar;
        const labelVisibleChars = isLabelVisible
          ? Math.min(item.label.length, currentChar - (labelStart - item.label.length))
          : 0;

        const isTextVisible = textStart < currentChar;
        const textVisibleChars = isTextVisible
          ? Math.min(item.text.length, currentChar - (textStart - item.text.length))
          : 0;

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
