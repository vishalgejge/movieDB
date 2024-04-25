import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getMovieDetail } from "../../utils/api";
import { useSelector } from "react-redux";
import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
// import { getMovieDetail } from "../../../utils/api";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;

    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const details = await getMovieDetail(data.id);
                console.log("Details --->>>",details);
                setMovieDetails(details);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [data.id]);

    return (
        <div className="movieCard" onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && !loading && movieDetails && ( // Check if movieDetails is not null
                    <React.Fragment>
                        <CircleRating rating={movieDetails.vote_average.toFixed(1)} />
                        <Genres data={movieDetails.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{movieDetails?.title || data.name}</span> // Use optional chaining to prevent errors if movieDetails is null
                <span className="date">
                    {dayjs(movieDetails?.release_date).format("MMM D, YYYY")} // Use optional chaining to prevent errors if movieDetails is null
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
