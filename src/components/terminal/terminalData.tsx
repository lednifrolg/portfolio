import { TerminalLine } from './types';
import { ContactLinks } from './ContactLinks';

export const terminalText: TerminalLine[] = [
  '$ nmap filiptomasovych.dev',
  'PORT     STATE SERVICE',
  '1337/tcp open  engineering',
  '8080/tcp open  backend',
  '',
  'Service Info: Kotlin, Compose, KMP',
  '',
  '$ cat ~/about.txt',
  'Filip Tomasovych',
  'Mobile Engineer | Slovakia | Remote',
  '',
  '$ ls ~/skills',
  'Kotlin  JetpackCompose  KMP  Coroutines  Ktor  SQLDelight  .NET',
  '',
  '$ wget filip.dev/contact',
  {
    type: 'contact',
    content: <ContactLinks isAnimating={true} />,
  },
  '',
  '$ sudo hire filip',
  'Password: ••••••••',
  'Access granted ✔️',
  'Installing Filip into your project...',
  'Progress: ████████████████ 100%',
  'Success! 🎉',
  '',
  '$ _',
];
