import '~/styles/globals.scss';
import 'animate.css';

import { Provider as JotaiProvider } from 'jotai';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '~/components/layouts/MainLayout';

import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    return (
        <JotaiProvider>{getLayout(<Component {...pageProps} />)}</JotaiProvider>
    );
}

export default MyApp;
