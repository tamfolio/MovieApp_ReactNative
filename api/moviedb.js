import axios from "axios";
import { apiKey } from "../constants";

const apiBaseurl = "https://api.themoviedb.org/3";
const apiKeyParam = `api_key=${apiKey}`;
const languageParam = "language=en-US";

const trendingMoviesEndpoint = `${apiBaseurl}/trending/movie/day?${apiKeyParam}&${languageParam}`;
const upComingMoviesEndpoint = `${apiBaseurl}/movie/upcoming?${apiKeyParam}&${languageParam}`;
const topRatedMoviesEndpoint = `${apiBaseurl}/movie/top_rated?${apiKeyParam}&${languageParam}`;
const searchMoviesEndpoint = `${apiBaseurl}/search/movie?${apiKeyParam}&${languageParam}`;

//dynamic endpints
// Dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseurl}/movie/${id}?${apiKeyParam}&${languageParam}`;
const movieCreditEndpoint = id => `${apiBaseurl}/movie/${id}/credits?${apiKeyParam}`;
const similarMoviesEndpoint = id => `${apiBaseurl}/movie/${id}/similar?${apiKeyParam}&${languageParam}`;
const personDetailsEndpoint = id => `${apiBaseurl}/person/${id}?${apiKeyParam}&${languageParam}`;
const personMoviesEndpoint = id => `${apiBaseurl}/person/${id}/movie_credits?${apiKeyParam}&${languageParam}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackPersonImage = 'https://unsplash.com/photos/a-man-with-no-shirt-on-standing-in-front-of-a-building-GSqa7pZQEBw'

const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {},
        headers: {
            accept: 'application/json',
        }
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("error: ", error);
        return {};
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upComingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}


export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditEndpoint(id))
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params=> {
    return apiCall(searchMoviesEndpoint, params)
}