import { NextPage } from 'next';
import Head from '~/components/shared/Head';
import Section from '~/components/shared/Section';
import DisclosureFAQ from '~/components/shared/DisclosureFAQ';
import { If, Then } from 'react-if';
import { FAQS_DOCS } from '~/constants';

const FAQsPage: NextPage = () => {
    return (
        <>
            <Head title="Real Cost - Câu hỏi thường gặp" />

            <Section
                style="px-4 mx-auto h-full w-full md:max-w-[644px] pt-36 lg:max-w-[1200px] space-y-6"
                title="Câu hỏi thường gặp"
            >
                <If condition={FAQS_DOCS && FAQS_DOCS.length}>
                    <Then>
                        {FAQS_DOCS.map((faq, index) => {
                            return (
                                <DisclosureFAQ
                                    key={index}
                                    title={faq.title}
                                    desc={faq.desc}
                                />
                            );
                        })}
                    </Then>
                </If>
            </Section>
        </>
    );
};

export default FAQsPage;
