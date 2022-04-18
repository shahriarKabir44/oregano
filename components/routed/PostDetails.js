import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button, Dimensions, Modal, ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Tags from '../shared/Tags';
import { TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import AddTocart from '../shared/AddTocart';
import CartServices from '../../services/CartServices';
import ImageViewer from 'react-native-image-zoom-viewer';
import { RootContext } from '../contexts/GlobalContext'
import LocationView from '../shared/LocationView';
import PostService from '../../services/PostService';
import RatingServices from '../../services/RatingServices';

function PostDetails(props) {
    const [isOwnPost, setOwnershipStatus] = React.useState(false)
    const [canShowRatingWindow, setRatingWindow] = React.useState(false)
    const [mapVisibility, setMapVisibility] = useState(false)
    const isFocused = useIsFocused()
    const rootContext = useContext(RootContext)
    const postId = props.route.params.postId
    const [post, setCurrentPost] = useState(null)
    const [canShowModal, toggleModal] = useState(false)
    const [currentUserRating, setCurrentUserRating] = useState(0)
    const [cartInfo, setCartInfo] = useState({
        amount: 0
    })
    const [hasUserRated, setRatingRelation] = React.useState(false)
    const [isRatingChanged, detectChange] = useState(false)
    const [ratingList, setRatingList] = useState([])
    const [images, setImageList] = useState([{ url: "abcd", props: "" }])
    const [isCartUpdated, setCartUpdateStatus] = useState(false)
    const [isAddedToCart, setCartStatus] = useState(false)
    const toggleBottomNavigationView = () => {
        toggleModal(!canShowModal);
    }
    function addToCart() {
        setCartStatus(true)
        updateCartInfo(post)
    }
    function removeFromCart() {
        setCartStatus(false)
        updateCartInfo(post)
    }
    function updateCartInfo(postInfo) {
        CartServices.isAddedToCart(postInfo.postedBy, postInfo.lowerCasedName).then(carts => {
            try {

                if (!carts) setCartStatus(false)

                else {
                    setCartStatus(true)
                    setCartInfo({ amount: carts })
                }
            } catch (error) {
                setCartStatus(false)
            }


        })
    }
    function updatecartAmount(inc) {
        setCartInfo({ ...cartInfo, info: { ...cartInfo.info, amount: Math.max(1, Math.min(cartInfo.info.amount + inc, post.amountProduced)) } })
    }
    const [orderList, setOrderList] = useState([])
    const [canPopUpImageModal, setImageModalVisibility] = useState(false)
    useEffect(() => {

        if (isFocused) {

            rootContext.setHeaderString("")
            PostService.getPostRatings(postId)
                .then(data => {
                    for (let ratingInfo of data) {
                        if (ratingInfo.getUser.id == rootContext.contextObject.currentUser.id) {
                            setRatingRelation(true)
                            setCurrentUserRating(ratingInfo.rating)
                        }
                    }
                    setRatingList(data)
                })
            PostService.findPost(postId)
                .then(postInfo => {
                    console.log(postInfo.lowerCasedName);
                    setCurrentPost(postInfo)
                    setOwnershipStatus(postInfo.owner.id == rootContext.contextObject.currentUser.id)
                    if (postInfo.owner.id == rootContext.contextObject.currentUser.id) {
                        PostService.getOrderList(postId)
                            .then(data => {
                                setOrderList(data);
                            })
                    }
                    rootContext.setHeaderString(`${postInfo.owner.id == rootContext.contextObject.currentUser.id ? "Your post" : postInfo.owner.facebookToken.name + "'s post"}`)
                    let images = []
                    for (let image of postInfo.images) {
                        images.push({
                            url: image,
                            props: ""
                        })
                    }

                    setImageList(images)
                    updateCartInfo(postInfo)
                    return postInfo
                })
        }
    }, [isFocused])

    function rateItem(rating) {
        RatingServices.rateItem(post.id, rootContext.contextObject.currentUser.id, rating, post.owner.id, JSON.stringify(post.tags), rootContext.contextObject.currentUser.facebookToken.name, post.itemName)
            .then(() => {
                if (!hasUserRated) {
                    setRatingList([...ratingList, {
                        rating: rating,
                        getUser: {
                            id: rootContext.contextObject.currentUser.id,
                            personalInfo: {
                                profileImageURL: rootContext.contextObject.currentUser.facebookToken.profileImageURL,
                                name: rootContext.contextObject.currentUser.facebookToken.name
                            }
                        }
                    }])
                }
                ToastAndroid.showWithGravity(
                    "Thank you for your rating!",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
                detectChange(false)
                setRatingRelation(true)
                setRatingWindow(false)
            })
    }


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
                                }}> {post.itemName} </Text>



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
                            <Text style={styles.infoText}>Tk. {post.unitPrice} </Text>
                            <Text style={styles.infoText}>{post.amountProduced} {post.unitType} available </Text>
                        </View>
                        <View style={styles.horizontalAlign}>
                            <Text style={styles.infoText}>Posted on:</Text>
                            <Text style={styles.infoText}>{(new Date(post.postedOn)).toLocaleTimeString()},{(new Date(post.postedOn)).toLocaleDateString()}</Text>

                        </View>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
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

                            {!isOwnPost && < Button onPress={() => {
                                setRatingWindow(true)
                            }} style={{
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 5,
                                flex: 1
                            }} title="rate item" />}

                        </View>
                        <View style={[styles.tags, styles.marginVertical, {
                            padding: 5
                        }]}>
                            <Text style={styles.tagIcon}>🏷️</Text>

                            {post.tags.map((tag, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    rootContext.updateContext({ ...rootContext.contextObject, headerString: "" })

                                    props.navigation.push('searchResult', {
                                        tag: tag
                                    })
                                }} >
                                    <Tags name={tag} />
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>

                    {!ratingList.length && <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            margin: 10
                        }}>Unrated</Text>
                    </View>}

                    {ratingList.length > 0 && <View>
                        <View>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                margin: 10
                            }}>Ratings</Text>
                        </View>
                        {ratingList.map((rating, index) => {
                            return <TouchableOpacity key={index}>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                    alignContent: "center",
                                    padding: 15,
                                    backgroundColor: "#E6E6E6",
                                    borderRadius: 10,
                                    margin: 10
                                }}>
                                    <Image style={{
                                        width: 50,
                                        borderRadius: 50,
                                        aspectRatio: 1
                                    }} source={{ uri: rating.getUser.personalInfo.profileImageURL }} />
                                    <View>
                                        <Text>{rating.getUser.personalInfo.name}</Text>
                                        {rating.getUser.id != rootContext.contextObject.currentUser.id && <Text>{rating.rating}⭐</Text>}
                                        {rating.getUser.id == rootContext.contextObject.currentUser.id && <Text>{currentUserRating}⭐</Text>}

                                    </View>
                                </View>
                            </TouchableOpacity>
                        })}
                    </View>}


                    {isOwnPost && <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            margin: 10
                        }}>Order list</Text>
                        {!orderList.length && <Text style={{

                            margin: 10
                        }}>No order has been placed</Text>}
                        <ScrollView style={{
                            flex: 1
                        }}>
                            {orderList.map((item, index) => {
                                return (<View key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 10,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    backgroundColor: "#c5d9ec",
                                    borderRadius: 10,
                                    margin: 5
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        alignContent: 'center',

                                    }}>
                                        <Image style={{
                                            height: 50,
                                            aspectRatio: 1,
                                            borderRadius: 50,
                                            margin: 5
                                        }} source={{ uri: item.orderDetails.buyer.personalInfo.profileImageURL }} />
                                        <View style={{
                                            margin: 5
                                        }}>
                                            <Text>{item.orderDetails.buyer.personalInfo.name}</Text>
                                            <Text>Amount:{item.amount}pcs</Text>
                                            <Text>{(new Date(item.orderDetails.time)).toLocaleTimeString()}, {(new Date(item.orderDetails.time)).toDateString()} </Text>
                                        </View>
                                    </View>
                                    <View>
                                        {item.orderDetails.status == 0 && <Text>Pending</Text>}
                                        {(item.orderDetails.status == 1 || item.orderDetails.status == 4) && <Text>Accepted</Text>}
                                        {item.orderDetails.status == 2 && <Text>Rejected</Text>}
                                        {item.orderDetails.status >= 5 && <Text>Rejected</Text>}
                                    </View>
                                </View>)
                            })}
                        </ScrollView>
                    </View>}
                </ScrollView>

                {!isOwnPost && <View>
                    {!isAddedToCart && <View style={styles.footer}>
                        <TouchableOpacity onPress={() => {
                            toggleBottomNavigationView()

                        }}>
                            <Text style={{
                                fontSize: 20
                            }}>Add to cart</Text>

                        </TouchableOpacity>

                    </View>}
                    {isAddedToCart && <View style={[styles.alighnHorizontal, {
                        justifyContent: "space-between",
                        width: "100%",
                        padding: 20,
                    }]}>
                        <View>
                            <Text>Amount:{cartInfo.amount}</Text>
                            <Text>Tk.{cartInfo.amount * post.unitPrice}</Text>
                        </View>

                        <FontAwesome5 onPress={() => {
                            console.log("del")
                            CartServices.delete(post.postedBy, post.lowerCasedName)
                                .then(() => {
                                    updateCartInfo(post)
                                })

                        }} name="trash" size={24} color="black" />


                    </View>}
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
            <BottomSheet
                visible={canShowRatingWindow}
                onBackButtonPress={() => {
                    setRatingWindow(false)
                }}
                onBackdropPress={() => {
                    setRatingWindow(false)
                }}
            >
                <View style={[styles.bottomNavigationView]}>
                    <View style={{
                        padding: 10,
                        margin: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"

                    }}>
                        <Text>Your rating:</Text>

                        <View style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            {[0, 1, 2, 3, 4].map((item, index) => {
                                return <View key={index}>
                                    {(item + 1 <= currentUserRating) && <AntDesign onPress={() => { setCurrentUserRating(item + 1); detectChange(true) }} name="star" size={24} color="black" />}
                                    {(item + 1 > currentUserRating) && <AntDesign onPress={() => { setCurrentUserRating(item + 1); detectChange(true) }} name="staro" size={24} color="black" />}

                                </View>
                            })}
                        </View>
                    </View>
                    {isRatingChanged && <TouchableOpacity onPress={() => {
                        rateItem(currentUserRating)
                    }} style={{
                        backgroundColor: "#E6E6E6",
                        padding: 20,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontSize: 15
                        }}>Update rating</Text>
                    </TouchableOpacity>}
                </View>
            </BottomSheet>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {},
    heading: {},

    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
        borderRadius: 10,

    },
    horizontalAlign: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    infoText: {
        fontSize: 15,
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