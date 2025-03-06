import { ReactNode } from "react";
import "./globals.css";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="flex justify-center items-center">
          <div className="max-w-2xl">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
