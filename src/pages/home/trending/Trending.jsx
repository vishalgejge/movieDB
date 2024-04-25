import React, { useState, useEffect } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { getUpcomingMovies } from "../../../utils/api";

const Trending = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchUpcomingMovies = async () => {
            try {
                const response = await getUpcomingMovies(page);
                // Update response data to include images
                const moviesWithImages = response.data.results.map(movie => ({
                    ...movie,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }));
                setData(moviesWithImages);
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
                <span className="carouselTitle">Upcoming Movies</span>
                <SwitchTabs data={["Movie"]} onTabChange={handlePageChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} />
        </div>
    );
};

export default Trending;
