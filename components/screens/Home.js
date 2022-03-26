import React, { useState, useContext, useEffect } from 'react';
import { Image, ActivityIndicator, Text, View, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { AnimeContext } from "../API/Context";
import ModalAnime from '../ModalAnime';
import Carousel from "react-native-snap-carousel";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = () => {
    const { darkTheme, fetchTopAnime, fetchTopManga, setError } = useContext(AnimeContext);
    const [Loading, setLoading] = useState(true)
    const [resultList, setResultList] = useState([])
    const [Target, setTarget] = useState()
    const [Visible, setVisible] = useState(false)
    const [filterValue, setFilterValue] = useState("Anime");
    const [activeIndex, setActiveIndex] = useState();

    useEffect(
        () => {
            setLoading(true);
            if (filterValue == "Manga") {
                fetchTopManga().then(data => {
                    setResultList(data.data)
                    setLoading(false)
                }).catch(e => setError(e))
            }
            else {
                fetchTopAnime().then(data => {
                    setResultList(data.data)
                    setLoading(false)
                }).catch(e => setError(e))
            }
        }, [filterValue]
    )

    return (
        <View style={{ backgroundColor: darkTheme ? "#282C35" : "white" }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', padding:10 }}>
                    <Text style={{ fontSize: 20, color: darkTheme ? 'white' : 'black' }} >Filter</Text>
                    <MaterialCommunityIcons
                        name='filter'
                        size={20}
                        color='white'
                        style={{ padding: 5 }}
                    />
                </View>
                <Picker
                    selectedValue={filterValue}
                    dropdownIconColor={darkTheme ? 'white' : 'black'}
                    style={{
                        height: 50, width: 150, color: darkTheme ? 'white' : 'black',
                    }}
                    onValueChange={(itemValue) => setFilterValue(itemValue)}
                >
                    <Picker.Item label="Anime" value="Anime" />
                    <Picker.Item label="Manga" value="Manga" />
                </Picker>
            </View>
            <View>
                {
                    Loading ? <ActivityIndicator size='large' color='#7868E6' /> : (
                        <View style={styles.carousel}>

                            <Carousel
                                layout={"stack"}
                                sliderHeight={300}
                                itemHeight={windowHeight}
                                vertical={true}
                                data={resultList}
                                renderItem={({ item }) =>
                                (
                                    <TouchableOpacity 
                                    key={item.mal_id}
                                    onPress={() => {
                                        setTarget(item)
                                        setVisible(true)
                                    }}>
                                        <View style={{
                                            height: windowHeight,
                                            width: windowWidth,
                                            transform: [{ scaleY: -1 }],
                                        }}
                                        key={item.mal_id}
                                        >

                                            <Image source={{ uri: item.images.jpg.large_image_url }} style={{
                                                height: "100%", resizeMode: "cover", width: windowWidth
                                            }} />
                                            <ImageBackground
                                                blurRadius={30}
                                                style={styles.footer}
                                                source={{ uri: item.images.jpg.large_image_url }}
                                            >
                                                <Text style={{
                                                    fontSize: 22,
                                                    color: darkTheme ? 'white' : 'black',
                                                    textAlign: 'center'
                                                }}>{item.title}</Text>
                                                <Text numberOfLines={5}
                                                    style={{ color: darkTheme ? 'white' : 'black', flex: 1, textAlign: 'center' }}>{item.synopsis}</Text>
                                            </ImageBackground>
                                        </View>
                                    </TouchableOpacity>
                                )
                                }
                                onSnapToItem={(index) => setActiveIndex(index)}
                            />
                        </View>
                    )
                }
            </View>
            {
                Target ?
                    <ModalAnime
                        Visible={Visible}
                        setVisible={setVisible}
                        Target={Target}
                    />
                    :
                    <View>
                    </View>
            }
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    carousel: {
        height: windowHeight - 120,
        transform: [{ scaleY: -1 }],
    },
    content: { fontSize: 18, paddingBottom: 10 },
    footer: {
        height: 150,
        width: windowWidth,
        position: "absolute",
        bottom: 0,
        backgroundColor: "#282C35",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
});