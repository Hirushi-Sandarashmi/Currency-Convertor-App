import { Navbar } from "@nextui-org/navbar";
import { NextUIProvider } from "@nextui-org/react";
import MainNavbar from "#/components/nav";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "next-auth/react";
import Providers from "#/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <>
            <MainNavbar />
            <div className="flex justify-center min-w-screen min-h-screen">
              {children}
            </div>
          </>
        </Providers>
      </body>
    </html>
  );
}
