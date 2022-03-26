import axios from "axios";
import React, { createContext, useState } from "react";

export const AnimeContext = createContext();

const Context = ({ children }) => {
    const [index, setIndex] = useState(1);
    const [darkTheme, setDarkTheme] = useState(true);
    const [error, setError] = useState('');

    const fetchAnimeCategories = async (id) => {
        const { data } = await axios.get(`https://api.jikan.moe/v3/genre/anime/${id}/1`);
        setIndex(1);
        return data;
    };

    const fetchTopAnime = async () => {
        try {
            const { data } = await axios.get(`https://api.jikan.moe/v4/top/anime`);
            setIndex(1);
            return data;
        } catch (error) {
            setError(error);
        }
    };

    const fetchTopManga = async () => {
        try {
            const { data } = await axios.get(`https://api.jikan.moe/v4/top/manga`);
            setIndex(1);
            return data;
        } catch (error) {
            setError(error);
        }
    };

    const SeachAnime = async (inputText) => {
        try {
            const { data } = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${inputText}`);
            return data;
        } catch (error) {
            setError(error);
        }
    };

    return (
        <AnimeContext.Provider
            value={{
                index,
                setIndex,
                darkTheme,
                setDarkTheme,
                fetchAnimeCategories,
                fetchTopAnime,
                fetchTopManga,
                SeachAnime,
                error,
                setError
            }}
        >
            {children}
        </AnimeContext.Provider>
    );
};

export default Context;