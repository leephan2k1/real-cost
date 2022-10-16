import { useSession } from 'next-auth/react';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';
import { Product } from 'types';
import { useEffectOnce } from 'usehooks-ts';
import ReactHotToast from '~/components/shared/ReactHotToast';
import { DOMAIN_BASE_URL } from '~/constants';

interface SocketContextType {
    product: Product | null;
    ping: boolean;
    resetState: () => void;
}

interface SocketContextProps {
    children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const { data } = useSession();
    const isEmitted = useRef(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    useEffectOnce(() => {
        setSocket(io(DOMAIN_BASE_URL));
    });

    useEffect(() => {
        if (socket?.connected && userId && !isEmitted.current) {
            socket?.emit('online-emitter', { userId });

            isEmitted.current = true;

            socket?.on('productNotifications', (product: Product) => {
                setProduct(product);
            });
        }
    }, [socket, data]);

    useEffect(() => {
        if (product)
            toast.custom((t) => <ReactHotToast t={t} product={product} />, {
                duration: 6000,
            });
    }, [product]);

    const resetState = () => {
        setProduct(null);
    };

    return (
        <SocketContext.Provider
            value={{ ping: !!product, resetState, product }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default function useSocket() {
    return useContext(SocketContext);
}
