import axios from 'axios';
import { useSession } from 'next-auth/react';
import { memo, ReactNode, useState } from 'react';
import useSWR from 'swr';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { register } from '~/services/registerServiceWorkers';

import { Subscription } from '../../../types';

interface SubscriptionProps {
    children: ReactNode;
}

const SubscriptionProvider = ({ children }: SubscriptionProps) => {
    const { data } = useSession();
    const [isSub, setIsSub] = useLocalStorage('dvWasSub', false);
    const [isSupportSW, setIsSupportedSW] = useLocalStorage('supportSW', false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    // load sw.js & get subscription
    useEffectOnce(() => {
        const setGetAndSetSubscription = async () => {
            const subscription = await register();
            if (!subscription) return;

            const parsed = JSON.parse(JSON.stringify(subscription));

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { expirationTime, ...rest } = parsed;

            setSubscription(rest);
        };

        if (isSupportSW) {
            setGetAndSetSubscription();
        } else {
            if (!('serviceWorker' in navigator)) {
                console.error('No Service Worker support!');
                return;
            }

            if (!('PushManager' in window)) {
                console.error('No Push API Support!');
                return;
            }

            setIsSupportedSW(true);

            setGetAndSetSubscription();
        }
    });

    useSWR(
        subscription && data && userId && !isSub
            ? `/api/users/subscribe`
            : null,
        async (slug: string) => {
            const { data } = await axios.post(slug, { userId, subscription });

            if (data?.status === 'success') {
                setIsSub(true);
            }
        },
    );

    return <>{children}</>;
};

export default memo(SubscriptionProvider);
