import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clanPro = localFont({
  src: [
    {
      path: '../public/fonts/FFClanProThin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFClanProRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFClanProItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/FFClanProMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFClanProMediumIt.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/FFClanProBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/FFClanProBoldIt.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-clan-pro',
});

export const metadata: Metadata = {
  title: "StoryMapp - A próxima geração do mercado de roteiros",
  description: "Entre na comunidade StoryMapp e receba conteúdos exclusivos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${clanPro.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
