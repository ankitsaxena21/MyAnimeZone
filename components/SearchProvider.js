import React, { useState, useEffect, useContext } from 'react'
import { Image, ActivityIndicator, Text, View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { AnimeContext } from "./API/Context";

const screen = Dimensions.get("screen");

export default function ApiData(props) {

    const { SeachAnime, darkTheme } = useContext(AnimeContext);
    const [Loading, setLoading] = useState(true)

    useEffect(
        () => {
            SeachAnime(props.SearchValue).then(data => {
                props.setData(data.results)
                setLoading(false)
            }).catch(() => (Alert.alert('Error', 'Verify your connection')))

        }, [props.SearchValue]
    )

    return (
        <View style={{
            alignItems: 'center',
            backgroundColor: darkTheme ? '#282C35' : '#f2f2f2'
        }}>
            {
                Loading ? <ActivityIndicator size='large' color='#7868E6' /> : (
                    <FlatList
                        data={props.Data}
                        keyExtractor={item => item.mal_id}
                        renderItem={({ item }) => (
                            <View style={Styles.searchContainer} key={item.mal_id}>
                                <View style={Styles.left}>
                                    <TouchableOpacity onPress={() => {
                                        props.setTarget(item)
                                        props.setVisible(true)
                                    }}>
                                        <Image source={{ uri: item.image_url }} style={Styles.anime} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    props.setTarget(item)
                                    props.setVisible(true)
                                }}>
                                    <View style={Styles.right}>
                                        <Text numberOfLines={2}
                                            style={{ fontSize: 16, color: darkTheme ? 'white' : 'black', fontWeight: 'bold', maxWidth: 200, textAlign: 'center', paddingTop: 8 }}>{item.title}</Text>
                                        <View style={Styles.details}>
                                            <View style={Styles.ep}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: darkTheme ? '#b6b6b6' : 'black' }}>Ep</Text>
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: darkTheme ? '#b6b6b6' : 'black', paddingTop: 5 }}>{item.episodes}</Text>
                                            </View>
                                            <View style={Styles.score}>
                                                <Icon
                                                    type='feather'
                                                    name='star'
                                                    fontWeight='bold'
                                                    color={darkTheme ? '#b6b6b6' : 'black'}
                                                />
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: darkTheme ? '#b6b6b6' : 'black', paddingTop: 3.5 }}>{item.score}</Text>
                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )
            }
        </View>
    )
}

const Styles = StyleSheet.create({
    anime: {
        height: 130,
        width: 100,
        margin: 5,
    },
    searchContainer: {
        width: screen.width,
        height: screen.height / 6,
        borderStyle: 'solid',
        margin: 10,
        borderBottomWidth: 1,
        borderColor: '#99a1b2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        width: screen.width / 3,
        alignItems: 'flex-start'
    },
    right: {
        width: screen.width / 2,
        alignItems: 'center',
    },
    details: {
        flexDirection: 'row-reverse',
        height: 100,
        width: 120,
        alignItems: 'center',
    },
    ep: {
        flexDirection: 'column',
        width: 50,
        height: 50,
        alignItems: 'center'
    },
    score: {
        flexDirection: 'column',
        width: 50,
        height: 50,
        alignItems: 'center'
    }
});
