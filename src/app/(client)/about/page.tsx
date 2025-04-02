import AboutUs from '@/components/about-us'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Namma Pettikadai',
    description: 'Namma Pettikadai is your trusted wholesale firecracker supplier, offering high-quality fireworks at unbeatable prices.',
    keywords: ['firecrackers', 'wholesale fireworks', 'best fireworks', 'Namma Pettikadai', 'festival fireworks'],
    authors: [{ name: 'Namma Pettikadai' }],
    openGraph: {
        title: 'About Us - Namma Pettikadai',
        description: 'Providing premium quality fireworks with safety and affordability.',
        url: 'https://yourwebsite.com/about',
        type: 'website',
        images: [
            {
                url: 'https://yourwebsite.com/images/banner.jpg',
                width: 1200,
                height: 630,
                alt: 'Namma Pettikadai Banner',
            },
        ],
    },
};
export default function page() {
    return (
        <>

            <AboutUs />
        </>
    )
}
