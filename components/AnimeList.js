import React, { useState, useEffect, useContext } from 'react'
import { Image, ActivityIndicator, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { AnimeContext } from "./API/Context";
import Carousel from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;
const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

const AnimeList = ({ id, setTarget, setVisible }) => {
    const { fetchAnimeCategories, darkTheme, setError } = useContext(AnimeContext);
    const [Loading, setLoading] = useState(true)
    const [GenreName, setGenreName] = useState('')
    const [GenreList, setGenreList] = useState([])

    useEffect(
        () => {
            fetchAnimeCategories(id).then(data => {
                setGenreList(data.anime)
                setGenreName(data.mal_url.name)
                setLoading(false)
            }).catch(e => setError(e))

        }, []
    )

    return (
        <View style={{ backgroundColor: darkTheme ? '#282C35' : '#f2f2f2', marginTop: 20 }} horizontal key={id}>
            <Text style={{
                fontSize: 20,
                color: darkTheme ? '#E4FBFF' : 'black',
                fontWeight: 'bold',
                textAlign: 'left',
                padding: 10
            }}>{GenreName}</Text>
            {
                Loading ? <ActivityIndicator size='large' color='#7868E6' /> : (
                    <Carousel
                        layout={"default"}
                        data={GenreList}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setTarget(item)
                                    setVisible(true)
                                }}
                                    key={index}>
                                    <Image source={{ uri: item.image_url }} style={{
                                        height: 100,
                                        width: 100,
                                        margin: 10
                                    }} />
                                    <Text numberOfLines={2}
                                        style={{ color: darkTheme ? '#fff' : 'black', maxWidth: 100, textAlign: 'center' }}>{item.title}</Text>
                                </TouchableOpacity>
                            );
                        }}
                        sliderWidth={windowWidth}
                        itemWidth={SLIDE_WIDTH}
                        activeSlideAlignment={"start"}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                    />
                )
            }
        </View>
    )
}

export default AnimeList;