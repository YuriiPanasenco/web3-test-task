import React from "react";

const NoSearchResults: React.FC = () => {
    return (
        <div className="flex flex-col items-center mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">No Results Found</h2>
            <p className="text-gray-500 mb-6">Try searching for something else.</p>
            <img
                src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?semt=ais_hybrid"
                alt="No results"
                className="w-96 h-72 object-cover rounded-md"
            />
        </div>
    );
};

export default NoSearchResults;
