import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? " " : "mt-3";

export default function MovieScreen() {
  let movieName = "Ant Man and the Wasp:Quantmania";
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState();
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState()
  const navigation = useNavigation({});
  useEffect(() => {
    // console.log("itemId:", item.id)
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id)
    getSimilarMovies(item.id)
  }, [item]);


  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id)
    // console.log("get movie details", data)
    if(data) setMovie(data)
    setLoading(false);
  }

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id)
    // console.log("get movie details", data)
    if(data && data.cast) setCast(data.cast)
    setLoading(false);
  }

  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id)
    // console.log("get movie details", data)
    if(data && data.results) setSimilarMovies(data.results)
    setLoading(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-5" +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => toggleFavourite(!isFavourite)}
          >
            <HeartIcon
              size="35"
              strokeWidth={2.5}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
            //   source={require("../assets/Images/moviePoster2.png")}
             source={{ uri: image500(movie?.poster_path)}}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
            {
                movie?.id?(
                    <Text className="text-neutral-400 font-semibold-text-base text-center">
                    {movie?.status} {"\u2022"} {movie?.release_date.split('-')[0]} {"\u2022"} {movie?.runtime} min
                  </Text>
                ): null
            }
       <View className="flex-row justify-center mx-4 space-x-2">
        {movie?.genres?.map((genre,index) => {
            let showDot  = index + 1 != movie.genres.length;
            <Text className="text-neutral-400 font-semibold-text-base text-center">
            {genre?.name} {showDot ? "\u2022" : null}
          </Text>
            })}
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide">
         {movie?.overview}
        </Text>
      </View>

      {cast?.length> 0 && <Cast cast={cast} navigation={navigation} />}

      {/* similar Movies */}
      {similarMovies?.length>0 && <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similarMovies}
      /> }
      
    </ScrollView>
  );
}
