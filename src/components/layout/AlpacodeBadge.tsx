'use client';
import Script from 'next/script';
import { useLanguage } from '@/i18n/LanguageProvider';

// <alpacode-badge> is a Web Component served by alpacode.it: React passes it through as-is.
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'alpacode-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        lang?: string;
        theme?: 'light' | 'dark' | 'auto';
        compact?: boolean | '';
      };
    }
  }
}

/**
 * "Made by Alpacode" credit at the bottom of the footer.
 * The inner link is in the server HTML (Italian, the SEO-canonical language):
 * crawlers read it and it is what shows if the script can't load. The badge
 * only speaks it/en, so every other locale gets the English version; the key
 * remounts the element when the language flips, so the component starts fresh.
 */
export default function AlpacodeBadge({ theme }: { theme: 'light' | 'dark' }) {
  const { locale } = useLanguage();
  const lang = locale === 'it' ? 'it' : 'en';
  return (
    <>
      <alpacode-badge key={lang} lang={lang} theme={theme}>
        {lang === 'it' ? (
          <a href="https://alpacode.it/">Realizzato da Alpacode</a>
        ) : (
          <a href="https://alpacode.it/en/">Made by Alpacode</a>
        )}
      </alpacode-badge>
      <Script id="alpacode-badge" src="https://alpacode.it/badge.js" strategy="lazyOnload" />
    </>
  );
}
