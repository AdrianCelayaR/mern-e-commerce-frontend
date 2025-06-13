import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    const closeSearchBar = () => {
        document.getElementById('searchBarInput').value = '';
        setSearch('');
        setShowSearch(false);
    }

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    }, [location])

    return showSearch ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} id='searchBarInput' onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search product'/>
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <img onClick={closeSearchBar} className='inline w-5 cursor-pointer' src={assets.close_menu_icon} alt="" />
        </div>
    ) : null;
}

export default SearchBar