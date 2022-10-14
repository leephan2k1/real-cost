import {
    Form,
    FormError,
    FormInput,
    FormLabel,
    FormReset,
    useFormState,
} from 'ariakit/form';
import { useEffect } from 'react';

interface PriceFormProps {
    handleSetValue: (value: string) => void;
}

export default function PriceForm({ handleSetValue }: PriceFormProps) {
    const form = useFormState({ defaultValues: { price: 0 } });

    useEffect(() => {
        handleSetValue(String(form.values?.price));
    }, [form.values]);

    return (
        <Form
            state={form}
            aria-labelledby="add-new-participant"
            className="wrapper"
        >
            <div className="flex items-center space-x-4">
                <FormLabel className="px-2" name={form.names.price}>
                    Giá (đơn vị VNĐ):
                </FormLabel>
                <FormInput
                    name={form.names.price}
                    required
                    type={'number'}
                    min={0}
                    className="rounded-lg bg-slate-200 py-2 px-4"
                    placeholder="x0.000 đồng"
                />
                <FormError name={form.names.price} className="text-rose-400" />
            </div>

            <div className="my-4 flex">
                <FormReset className="smooth-effect rounded-xl border border-rose-400 bg-rose-400 py-2 px-4 text-white hover:scale-90">
                    Đặt lại
                </FormReset>
            </div>
        </Form>
    );
}
