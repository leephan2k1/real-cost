import 'animate.css';
import 'nprogress/nprogress.css';
import '~/styles/globals.scss';

import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode } from 'react';
import { useEventListener } from 'usehooks-ts';
import SubscriptionProvider from '~/components/features/Subscription';
import MainLayout from '~/components/layouts/MainLayout';
import { SocketContextProvider } from '~/context/SocketContext';

import { Analytics } from '@vercel/analytics/react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({
    Component,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    useEventListener('focus', () => {
        const event = new Event('visibilitychange');
        document.dispatchEvent(event);
    });

    return (
        <>
            <Analytics />

            <SessionProvider session={session} refetchInterval={5 * 60}>
                <JotaiProvider>
                    <SubscriptionProvider>
                        <SocketContextProvider>
                            {getLayout(<Component {...pageProps} />)}
                        </SocketContextProvider>
                    </SubscriptionProvider>
                </JotaiProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
