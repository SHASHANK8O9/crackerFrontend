import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CartProvider } from "@/contexts/cart-contexts";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`antialiased`}
        >
            <CartProvider>
                <SiteHeader />
                {children}
                <SiteFooter />
            </CartProvider>

        </div>
    );
}
