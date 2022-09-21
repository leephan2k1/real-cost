import { NextPage } from 'next';
import ItemContainer from '~/components/shared/ProductsContainer';
import SearchFilter from '~/components/shared/SearchFilter';

const SearchPage: NextPage = () => {
    return (
        <div className="w-max-[1300px] mx-auto w-[90%] pt-[100px] text-black">
            <SearchFilter />

            <ItemContainer />
        </div>
    );
};

export default SearchPage;
