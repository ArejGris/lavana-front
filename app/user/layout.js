'use client'
import StoreProvider from "./StoreProvider";

export default function Layout({ children }) {
    return (
      <html lang="en">
        <body>
            <StoreProvider>
        {children}
        </StoreProvider>
        </body>
      </html>
    );
  }