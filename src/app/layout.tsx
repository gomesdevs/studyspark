import type {Metadata} from 'next';
import { Inter } from 'next/font/google' // Using Inter as a common, clean font
import './globals.css';
import { cn } from "@/lib/utils"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'StudySpark - Personalized Study Tool',
  description: 'Boost your learning with AI-powered quizzes and personalized study suggestions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
         className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
       >
        {children}
      </body>
    </html>
  );
}
