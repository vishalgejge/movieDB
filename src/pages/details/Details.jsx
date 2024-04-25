import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import { getMovieDetail } from "../../utils/api";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: videoData, loading: videoLoading } = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos`);
    const { data: creditsData, loading: creditsLoading } = useFetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits`);
    const movieDetailUrl = `https://api.themoviedb.org/3/movie/${id}`; // Construct the URL string
    const { data: movieDetail, loading: detailLoading } = useFetch(movieDetailUrl); // Pass URL string to useFetch
    console.log('id -> ',id)
    console.log('id -> ',videoData)
    console.log('id -> ',mediaType)
    return (
        <div>
            <DetailsBanner video={videoData?.results?.[0]} crew={creditsData?.crew} />
            <Cast data={creditsData?.cast} loading={creditsLoading} />
            <VideosSection data={videoData} loading={videoLoading} />
            {!detailLoading && <h2>{movieDetail?.title}</h2>} 
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
