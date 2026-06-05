import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <span className="text-gradient font-bold tracking-tight">{appName}</span>,
      transparentMode: 'top',
    },
    links: [
      { text: 'Docs', url: '/docs' },
      { text: 'Getting Started', url: '/docs/getting-started' },
      { text: 'Maven', url: 'https://repo.alaz.so' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
