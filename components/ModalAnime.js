import React, { useContext } from 'react'
import { Modal, View, Text, StyleSheet, Button, Image } from 'react-native'
import { AnimeContext } from "./API/Context";

export default function (props) {
    const { darkTheme } = useContext(AnimeContext);

    return (
        <Modal
            transparent={true}
            visible={props.Visible}>
            <View style={{
                backgroundColor: darkTheme ? '#212121' : 'white',
                height: '100%',
                width: '100%',
                alignContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <Image source={{ uri: props.Target.image_url ? props.Target.image_url : props.Target.images.jpg.large_image_url }} style={styles.img} />
                    <View style={styles.details}>
                        <Text style={{
                            justifyContent: 'flex-start',
                            color: darkTheme ? '#E4FBFF' : 'black',
                            fontSize: 20,
                            marginTop: '5%',
                            textAlign: 'center'
                        }}>{props.Target.title}</Text>
                        <Text style={{
                            justifyContent: 'flex-start',
                            color: darkTheme ? '#E4FBFF' : 'black',
                            fontSize: 20,
                            marginTop: '5%',
                            textAlign: 'center'
                        }}>Score</Text>
                        <Text style={{
                            fontSize: 20,
                            color: darkTheme ? '#E4FBFF' : 'black',
                            textAlign: 'left',
                            paddingBottom: '5%'
                        }}>{props.Target.score}</Text>
                        <Text style={{
                            justifyContent: 'flex-start',
                            color: darkTheme ? '#E4FBFF' : 'black',
                            fontSize: 20,
                            marginTop: '5%',
                            textAlign: 'center'
                        }}>Episodes</Text>

                        <Text style={{
                            fontSize: 20,
                            color: darkTheme ? '#E4FBFF' : 'black',
                            textAlign: 'left',
                            paddingBottom: '5%'
                        }}>{props.Target.episodes}</Text>
                        <Text style={{
                            justifyContent: 'flex-start',
                            color: darkTheme ? '#E4FBFF' : 'black',
                            fontSize: 20,
                            marginTop: '5%',
                            textAlign: 'center'
                        }}>Duration</Text>

                        <Text style={{
                            fontSize: 20,
                            color: darkTheme ? '#E4FBFF' : 'black',
                            textAlign: 'left',
                            paddingBottom: '5%'
                        }}>{props.Target.duration}</Text>
                    </View>
                </View>
                <View style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    textAlign: 'center'
                }}>
                    <Text numberOfLines={14}
                        style={{
                            color: darkTheme ? '#E4FBFF' : 'black',
                            fontSize: 16,
                            marginBottom: '10%',
                            maxWidth: '95%',
                            marginTop: '5%'

                        }}>{props.Target.synopsis}</Text>
                </View>
                <View>
                    <Button
                        title="Close"
                        color="#8c52ff"
                        onPress={() => props.setVisible(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    details: {
        alignSelf: 'flex-end',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        height: '95%',
    },
    img: {
        alignContent: 'flex-start',
        height: 250,
        width: 160,
        margin: '2%',
        marginTop: '6%'

    }
})