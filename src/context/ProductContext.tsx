import { createContext, ReactNode, useContext } from 'react';

interface ProductContextType {
    removeProduct: (removeMode: 'single' | 'multiple', link?: string) => void;
}

interface ProductContextProps {
    children: ReactNode;
    value: ProductContextType;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductContextProvider = ({
    children,
    value,
}: ProductContextProps) => {
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default function useProduct() {
    return useContext(ProductContext);
}
