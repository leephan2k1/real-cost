import type { NextPage } from 'next';
import Section from '~/components/shared/Section';
import Banner from '~/components/partials/Banner';

const Home: NextPage = () => {
    return (
        <div className="flex h-fit min-h-screen flex-col">
            <Section style="z-[60] h-[600px] w-full bg-[url('https://i.ibb.co/7S4dW19/v904-nunny-012-min.jpg')] bg-cover bg-center bg-no-repeat py-[100px] text-gray-700">
                <Banner />
            </Section>
        </div>
    );
};

export default Home;
