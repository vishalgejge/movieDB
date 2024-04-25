import React, { useState, useEffect } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { getTopRatedMovies, fetchDataFromApi } from "../../../utils/api";

const TopRated = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchTopRatedMovies = async () => {
            try {
                const response = await getTopRatedMovies(page);
                // Update response data to include images
                const moviesWithImages = response.data.results.map(movie => ({
                    ...movie,
                    imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }));
                setData(moviesWithImages);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching top rated movies:", error);
                setLoading(false);
            }
        };
        fetchTopRatedMovies();
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies"]} onTabChange={handlePageChange} />
            </ContentWrapper>
            <Carousel data={data} loading={loading} />
        </div>
    );
};

export default TopRated;
