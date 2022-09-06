import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface MainLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Sidebar = dynamic(() => import('../partials/Sidebar'));

export default function MainLayout({ children, showHeader }: MainLayoutProps) {
    const matchesMobile = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            {showHeader && <Header />}
            <main className="overflow-x-hidden">{children}</main>
            {matchesMobile && <Sidebar />}
        </>
    );
}
