import React, {useState, useEffect, useCallback} from 'react';

type SearchInputProps = {
    queryString: string;
    searchHandler: (string) => void
};

const SearchInput: React.FC<SearchInputProps> = ({queryString = "", searchHandler}) => {
    const [query, setQuery] = useState(queryString);
    const [isTyping, setIsTyping] = useState(false);
    const [timer, setTimer] = useState(null);

    const handleSearch = useCallback(() => {
        searchHandler(query);
    }, [query, searchHandler]);


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
