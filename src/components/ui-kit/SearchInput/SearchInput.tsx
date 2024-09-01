import React, {useState, useEffect} from 'react';
import useDebounce from "../../../hooks/useDebounce";


type SearchInputProps = {
    queryString: string;
    searchHandler: (string) => void
};

const SearchInput: React.FC<SearchInputProps> = ({queryString = "", searchHandler}) => {
    const [query, setQuery] = useState(queryString);
    const [debouncedQuery, enter]: [string, () => void] = useDebounce(query, 1500);

    useEffect(() => {
        if (debouncedQuery !== queryString) {
            searchHandler(debouncedQuery);
        }
    }, [debouncedQuery, searchHandler, queryString]);


    const handleKeyPress = (event) => {
        setQuery(event.target.value);
        if (event.key === 'Enter') {
            enter();
        }
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <>
            <div className="w-full max-w-sm">
                <input
                    name="search"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </>
    );
};

export default SearchInput;
