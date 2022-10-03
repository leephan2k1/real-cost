import '~/styles/globals.scss';
import 'animate.css';
import 'nprogress/nprogress.css';

import { Provider as JotaiProvider } from 'jotai';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '~/components/layouts/MainLayout';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
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
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <JotaiProvider>
                {getLayout(<Component {...pageProps} />)}
            </JotaiProvider>
        </SessionProvider>
    );
}

export default MyApp;
