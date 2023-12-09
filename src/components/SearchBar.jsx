import React, { useEffect, useState } from 'react'
import { FaSearch, FaTrash } from 'react-icons/fa';


const SearchBar = (props) => {
    const { searchValue, setSearchValue } = props;

    const handleTrashClick = () => {
        setSearchValue("");
    };

    return (
        <div className="flex-grow flex items-center">
            <div className="space-x-1 relative w-full">
                <input
                    type="text"
                    className="block w-full pl-10 py-1 rounded-full bg-stone-800 focus:ring-stone-300 focus:outline-none focus:ring-opacity-40"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {
                    searchValue &&
                    <button className="absolute top-0 right-0 px-2 py-2 rounded-full" onClick={handleTrashClick}>
                        <FaTrash />
                    </button>
                }
                <div className="absolute top-0 left-0 px-2 py-2 rounded-full">
                    <FaSearch className='text-gray-400' />
                </div>
            </div>
        </div>
    );
}

export default SearchBar