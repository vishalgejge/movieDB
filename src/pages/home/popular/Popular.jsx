import React, { useState, useEffect } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { getPopularMovies } from "../../../utils/api";

const Popular = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [endpoint, setEndpoint] = useState();

    useEffect(() => {
    setEndpoint("movie")

        setLoading(true);
        const fetchUpcomingMovies = async () => {
            try {
                const response = await getPopularMovies(page);
                const moviesWithImages = response.data.results.map(movie => ({
                    ...movie,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }));
                setData(moviesWithImages);
                // setData(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
                setLoading(false);
            }
        };
        fetchUpcomingMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs data={["Movies"]} onTabChange={handlePageChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default Popular;
