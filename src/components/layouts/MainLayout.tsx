import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import ClientOnly from '~/components/shared/ClientOnly';

interface MainLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Footer = dynamic(() => import('../partials/Footer'));
const MobileSearchModal = dynamic(
    () => import('~/components/shared/MobileSearchModal'),
);
const Sidebar = dynamic(() => import('../partials/Sidebar'));

export default function MainLayout({
    children,
    showHeader,
    showFooter,
}: MainLayoutProps) {
    const matchesMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            {showHeader && <Header />}
            <main className="min-h-screen overflow-y-hidden">{children}</main>
            {matchesMobile && (
                <ClientOnly>
                    <Sidebar /> <MobileSearchModal />
                </ClientOnly>
            )}
            {showFooter && <Footer />}
        </>
    );
}
