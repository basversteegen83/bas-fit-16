export const metadata = {
  title: 'Bas Fit 16',
  description: 'Persoonlijke 16-weken fitness tracker',
  appleWebApp: { capable: true, title: 'Bas Fit 16', statusBarStyle: 'default' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#202a23',
};

export default function Layout({ children }) {
  return <html lang="nl">
    <head>
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </head>
    <body>{children}</body>
  </html>;
}
