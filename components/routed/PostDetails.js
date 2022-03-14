import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button, Dimensions, Modal } from 'react-native';
import Globals from '../Globals';
import { useIsFocused } from '@react-navigation/native';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Tags from '../shared/Tags';
import { TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import AddTocart from '../shared/AddTocart';
import CartServices from '../../services/CartServices';
import ImageViewer from 'react-native-image-zoom-viewer';
import { RootContext } from '../contexts/GlobalContext'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import openMap from 'react-native-open-maps';
import LocationView from '../shared/LocationView';

function PostDetails(props) {
    const [mapVisibility, setMapVisibility] = useState(false)
    const isFocused = useIsFocused()
    const rootContext = useContext(RootContext)
    const postId = props.route.params.postId
    const [post, setCurrentPost] = useState(null)
    const [canShowModal, toggleModal] = useState(false)
    const [cartInfo, setCartInfo] = useState({
        info: null,
        itemIndex: 0
    })
    const [currentPosition, setCurrentPosition] = useState(null)
    const [images, setImageList] = useState([{ url: "abcd", props: "" }])
    const [isCartUpdated, setCartUpdateStatus] = useState(false)
    const [isAddedToCart, setCartStatus] = useState(false)
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        toggleModal(!canShowModal);
    }
    function addToCart() {
        setCartStatus(true)
        updateCartInfo()
    }
    function removeFromCart() {
        setCartStatus(false)
        updateCartInfo()
    }
    function updateCartInfo() {
        CartServices.getCartList().then(carts => {
            try {
                if (!carts.length) setCartStatus(false)
                for (let n = 0; n < carts.length; n++) {

                    if (carts[n]['id'] == props.route.params.postId) {
                        setCartStatus(true)

                        setCartInfo({ info: carts[n], itemIndex: n })
                        break
                    }
                }
            } catch (error) {
                setCartStatus(false)
            }


        })
    }
    function updatecartAmount(inc) {
        setCartInfo({ ...cartInfo, info: { ...cartInfo.info, amount: Math.max(1, Math.min(cartInfo.info.amount + inc, post.amountProduced)) } })
    }



    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0
    });
    const [currentLocationGeoCode, setCurrentLocationGeoCode] = useState("")
    const [canPopUpImageModal, setImageModalVisibility] = useState(false)
    const [postLocationGeoCode, setPostLocationGeoCode] = useState("")
    useEffect(() => {

        if (isFocused) {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                let currentLocationGeoCode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
                setCurrentLocationGeoCode(`${currentLocationGeoCode[0].name}, ${currentLocationGeoCode[0].street}, ${currentLocationGeoCode[0].postalCode}, ${currentLocationGeoCode[0].city}`)

            })();
            rootContext.updateContext({ ...rootContext.contextObject, headerString: "" })

            Globals.getPostInfo(postId)
                .then(postInfo => {
                    setCurrentPost(postInfo)
                    rootContext.updateContext({ ...rootContext.contextObject, headerString: `${postInfo.owner.facebookToken.name}' post` })
                    let images = []
                    for (let image of postInfo.images) {
                        images.push({
                            url: image,
                            props: ""
                        })
                    }

                    setImageList(images)
                    updateCartInfo()
                    return postInfo
                }).then((postData) => {

                    (async () => {
                        let location = await Location.reverseGeocodeAsync({
                            latitude: postData.latitude,
                            longitude: postData.longitude
                        })
                        setPostLocationGeoCode(`${location[0].name}, ${location[0].street}, ${location[0].postalCode}, ${location[0].city}`)

                    })()


                })
        }
    }, [isFocused])
    return (
        <View style={{
            height: Dimensions.get('window').height,
            flex: 1
        }}>
            {post && <View style={{
                flex: 1
            }}>
                <ScrollView style={{

                    margin: 10,
                    backgroundColor: "white",
                    borderRadius: 10
                }}>
                    <View style={{
                        padding: 20, flex: 1
                    }}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            alignContent: "center"
                        }}>
                            <Image style={{
                                width: 100,
                                aspectRatio: 1,
                                borderRadius: 100
                            }} source={{
                                uri: post.images[0]
                            }} />
                            <View style={styles.primaryInfo}>
                                <Text style={{
                                    fontSize: 30,
                                    fontWeight: "bold"
                                }}> {post.itemName}
                                </Text>


                            </View>
                        </View>
                        <View style={{
                            marginHorizontal: 5,
                            marginVertical: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                paddingVertical: 10
                            }}> Prepared By: </Text>
                            <TouchableOpacity onPress={() => {
                                rootContext.updateContext({ ...rootContext.contextObject, headerString: '' })

                                props.navigation.push('profile', {
                                    id: post.owner.id
                                })
                            }}>
                                <View style={[styles.horizontal_vert_Align, {
                                    backgroundColor: "#a1ef781f",
                                    padding: 10,
                                    borderRadius: 10
                                }]}>
                                    <Image style={{
                                        width: 50,
                                        aspectRatio: 1,
                                        borderRadius: 50
                                    }} source={{
                                        uri: post.owner.facebookToken.profileImageURL
                                    }} />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}> {post.owner.facebookToken.name} </Text>
                                </View>
                            </TouchableOpacity>

                        </View>

                        <Text style={{
                            fontSize: 20
                        }}>Details: </Text>
                        <FlatList
                            horizontal={true}
                            data={post.images}
                            keyExtractor={image => image}
                            renderItem={(image) => {
                                return <View style={{
                                    padding: 5
                                }}>
                                    <TouchableOpacity onPress={() => {
                                        setImageModalVisibility(true)
                                    }}>
                                        <Image source={{ uri: image.item }} style={{
                                            width: 200,
                                            aspectRatio: 1,

                                        }} />
                                    </TouchableOpacity>
                                </View>

                            }}
                        />
                        <View style={styles.horizontalAlign}>
                            <Text style={styles.infoText}> Tk. {post.unitPrice} </Text>
                            <Text style={styles.infoText}> {post.amountProduced} {post.unitType} available </Text>
                        </View>
                        <View style={styles.horizontalAlign}>
                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                flexDirection: 'row',
                            }} >
                                <Text><EvilIcons name="location" size={30} color="black" /> </Text>
                                <Text style={styles.infoText}>3km</Text>
                            </View>
                            <Text style={styles.infoText}> 3 Hours ago </Text>

                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Button onPress={() => {
                                setMapVisibility(true)
                            }} style={{
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 5,
                                flex: 1
                            }} title="View location" />
                        </View>
                        <View style={[styles.tags, styles.marginVertical, {
                            padding: 5
                        }]}>
                            <Text style={styles.tagIcon}>🏷️</Text>

                            {post.tags.map((tag, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    rootContext.updateContext({ ...rootContext.contextObject, headerString: "" })

                                    props.navigation.navigate('searchResult', {
                                        tag: tag
                                    })
                                }} >
                                    <Tags name={tag} />
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                </ScrollView>

                {!isAddedToCart && <View style={styles.footer}>
                    <TouchableOpacity onPress={() => {
                        toggleBottomNavigationView()

                    }}>
                        <Text style={{
                            fontSize: 20
                        }}> Add to cart </Text>

                    </TouchableOpacity>

                </View>}
                {isAddedToCart && <View style={styles.footer2}>
                    <View style={{
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: "#c4c4c4"
                    }}>
                        <FontAwesome onPress={() => {
                            CartServices.removeItem(post.id)
                            setCartStatus(false)
                        }} name="trash-o" size={30} color="black" />
                    </View>
                    {isCartUpdated && <TouchableOpacity style={{
                        paddingVertical: 10,
                        paddingHorizontal: 80,
                        backgroundColor: "#77cf8e",
                        borderRadius: 10,

                    }} onPress={() => {

                        CartServices.updateCartAmount(postId, cartInfo?.info?.amount)
                            .then(() => {
                                updateCartInfo()
                                setCartUpdateStatus(false)
                            })
                    }} >
                        <Text>Update</Text>
                    </TouchableOpacity>}
                    <View style={styles.alighnHorizontal}>
                        <TouchableOpacity onPress={() => {
                            updatecartAmount(1)
                            setCartUpdateStatus(true)
                        }} >
                            <View style={styles.updateAmountBtn}>
                                <Text style={{
                                    fontSize: 20
                                }}>+</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.updateAmountBtn, {
                            backgroundColor: "#C4C4C4"
                        }]}>
                            <Text style={{
                                fontSize: 20
                            }}>{cartInfo?.info?.amount}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            updatecartAmount(-1)
                            setCartUpdateStatus(true)

                        }}>
                            <View style={styles.updateAmountBtn}>
                                <Text style={{
                                    fontSize: 20
                                }}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}

                <BottomSheet
                    visible={canShowModal}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >
                    <View style={styles.bottomNavigationView}>
                        <AddTocart togglePopup={toggleBottomNavigationView} addToCart={addToCart} post={post} />
                    </View>
                </BottomSheet>
                <Modal visible={canPopUpImageModal} transparent={true}>
                    <ImageViewer onDoubleClick={() => {
                        setImageModalVisibility(false)
                    }} imageUrls={images} />
                </Modal>

                <LocationView mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={post} tagnameLabel="Post location" />

            </View>
            }

        </View>
    );
}
const styles = StyleSheet.create({
    container: {},
    heading: {},

    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: Dimensions.get('window').height * 0.65,
        borderRadius: 10
    },
    horizontalAlign: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoText: {
        fontSize: 20,
        fontStyle: "italic"
    },
    horizontal_vert_Align: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',

    },
    tagIcon: {
        padding: 0,
        fontSize: 30
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    popular: {
        backgroundColor: "#FCEEC7",
        borderRadius: 30,
        height: 30,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 15,
        width: 100
    },
    footer: {
        backgroundColor: "#FFA500",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    footer2: {
        backgroundColor: "#ffffff",
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        padding: 10
    },
    updateAmountBtn: {
        backgroundColor: "#FA01FF",
        height: 40,
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    alighnHorizontal: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    }
})
export default PostDetails;