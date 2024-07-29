import type { Metadata } from "next";
import "@/styles/main.scss";
import Providers from "./providers";
import { Header } from "@/components";


export const metadata: Metadata = {
    title: "Games API",
    description: "Games API",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
