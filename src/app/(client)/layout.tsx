import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CartProvider } from "@/contexts/cart-contexts";


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
                <CartProvider>
                    <SiteHeader />
                    <main>{children}</main>
                    <SiteFooter />
                </CartProvider>

            </body>
        </html>
    );
}
