import Script from 'next/script';

import { Analytics } from '@vercel/analytics/react';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import Header from '@/components/header/header';
import Provider from '@/components/provider';
import ScrollUpButton from '@/components/scroll-up-button';
import '@/styles/globals.css';
import '@/styles/paginate.css';

export const metadata = {
  title: {
    default: 'DataMozz',
    template: '%s | DataMozz',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let dataDomain = `${process.env.NEXT_PUBLIC_BASE_DOMAIN || ''}`
  return (
    <html lang="en">
      <head>
      <script defer data-domain={dataDomain} src="https://plausible.io/js/script.js"></script>
      </head>
      {/* https://enlear.academy/add-google-analytics-to-a-next-js-application-5525892844db */}
      <Script
        id="load-google-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />

      <Script id="setup-google-analytics" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <body className="text-primary bg-primary relative mx-auto mb-20 flex w-full max-w-screen-xl flex-col px-[10vw] md:px-[5vw]">
        <Provider>
          <Header />
          <main>{children}</main>
          <div className="fixed bottom-12 right-10">
            <ScrollUpButton />
          </div>
        </Provider>
      </body>
      <Analytics />
    </html>
  );
}
