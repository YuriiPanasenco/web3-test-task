import React, {useState, useEffect} from 'react';

type SearchInputProps = {
    queryString: string;
    searchHandler: (string) => void
};

const SearchInput: React.FC<SearchInputProps> = ({queryString = "", searchHandler}) => {
    const [query, setQuery] = useState(queryString);
    const [isTyping, setIsTyping] = useState(false);
    const [timer, setTimer] = useState(null);

    const handleSearch = () => {
        searchHandler(query);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            clearTimeout(timer);
            handleSearch();
            setIsTyping(false);
        }
    };

    // Reset typing state and trigger search after 3 seconds
    useEffect(() => {
        if (isTyping) {
            const timer = setTimeout(() => {
                handleSearch();
                setIsTyping(false);
            }, 1500);
            setTimer(timer);
            return () => clearTimeout(timer);
        }
    }, [query, isTyping, handleSearch]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setIsTyping(true);
    };

    return (
        <>
            <div className="relative w-[90%] md:w-1/2">
                <input
                    name="search"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className="absolute top-1 right-1 h-[34px] bg-blue-500 text-white px-4 py-1 rounded-full"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </>
    );
};

export default SearchInput;
