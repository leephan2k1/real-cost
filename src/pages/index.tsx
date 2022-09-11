import type { NextPage } from 'next';
import Section from '~/components/shared/Section';
import Banner from '~/components/partials/Banner';

const Home: NextPage = () => {
    return (
        <div className="flex h-fit min-h-screen flex-col">
            <Section style="z-[60] h-[600px] w-full bg-[url('https://cdn.dribbble.com/users/43762/screenshots/1193020/media/18e355ce88914a10ff30668836b1b997.gif')] bg-cover bg-center bg-no-repeat py-[100px] text-white">
                <Banner />
            </Section>
        </div>
    );
};

export default Home;
