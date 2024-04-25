import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getApiConfiguration, getGenres } from "./utils/api";

import { useDispatch } from "react-redux";
import { getApiConfiguration as setApiConfigAction, getGenres as setGenresAction } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const apiConfig = await getApiConfiguration();
            dispatch(setApiConfigAction(apiConfig));
    
            const genres = await getGenres();
            dispatch(setGenresAction(genres));
        }
        fetchData();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
