import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Varsha N — AI Engineer & Data Scientist',
  description: 'AI & Data Science Engineer passionate about Machine Learning, Deep Learning, Computer Vision, NLP, and Generative AI. Building intelligent systems that solve real-world problems.',
  keywords: ['AI Engineer', 'Data Scientist', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Generative AI', 'Python', 'TensorFlow'],
  authors: [{ name: 'Varsha N' }],
  creator: 'Varsha N',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Varsha N — AI Engineer & Data Scientist',
    description: 'Building AI that solves real problems. Explore projects in Computer Vision, NLP, and Generative AI.',
    siteName: 'Varsha N Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Varsha N — AI Engineer & Data Scientist',
    description: 'Building AI that solves real problems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050508] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
