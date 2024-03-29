import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Search.css';
import { useSelector } from 'react-redux';
import SpotifyAPI from '../../api/SpotifyAPI'
function SearchTrack({ setResult, offset, limit }) {

    SearchTrack.propTypes = {
        setResult: PropTypes.func,
        offset: Number || 0,
        limit: Number || 24
    }

    const [searchQuery, setsearchQuery] = useState([]);
    const token = useSelector((state) => state.accesstoken.value);

    const searchTrack = async () => {
        const {
            data: tracks
        } = await SpotifyAPI.getSearchTrack(token, searchQuery, offset, limit);
        return tracks.tracks.items;
       
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            let data = await searchTrack()
            setResult(data)
        }
        fetchData();
    }

    useEffect(() => {
        const fetchData = async () => {
            let data = await searchTrack()
            setResult(data)
        }
        fetchData();
    
    }, [offset])

    return (
        <div>
            <form className='mt-8' onSubmit={(event) => handleSearch(event)}>   
                <label htmlFor="default-search" className="my-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                     data-testid="search-bar"
                     id="outlined"
                     onChange={(event) => setsearchQuery(event.target.value)}
                    type="search" className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-800 border-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search something" required/>
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
    )
    
}

export default SearchTrack;