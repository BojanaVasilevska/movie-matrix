import "@/app/globals.css";
import { ReactNode } from "react";
import { Providers } from "./components/Providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-background text-foreground">
        <Providers>
          <main >{children}</main>
        </Providers>
      </body>
    </html>
  );
}

