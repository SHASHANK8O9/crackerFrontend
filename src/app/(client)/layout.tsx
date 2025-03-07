import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                <SiteHeader />
                <main>{children}</main>
                <SiteFooter />
            </body>
        </html>
    );
}
