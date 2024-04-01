import JotaiProvider from "@/components/jotai-provider";
import "./styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";

const monty = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={monty.className}>
          <JotaiProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </JotaiProvider>
        </body>
      </html>
    </>
  );
}
