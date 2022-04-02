import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, ToastAndroid } from 'react-native'
import OrderServices from '../../../services/OrderServices'
import { RootContext } from '../../contexts/GlobalContext';
import Ordergroup from './Ordergroup';
import { BottomSheet } from 'react-native-btr';
import { AntDesign } from '@expo/vector-icons';
import RatingServices from '../../../services/RatingServices';

function OrderHistory(props) {
    const isFocused = useIsFocused()
    const { contextObject, setHeaderString } = React.useContext(RootContext)
    const [ratingList, setRatingList] = React.useState([0, 1, 2, 3, 4])
    const [orderList, setOrderList] = React.useState([])
    const [bottomSheetVisibility, popupBottomSheet] = React.useState(false)
    const [currentlyFocusedProduct, setCurrentProduct] = React.useState(null)
    const [hasRatingChanged, detectChange] = React.useState(false)
    const [shouldreload, setReloading] = React.useState(false)
    React.useEffect(() => {
        popupBottomSheet(false)
        setCurrentProduct(null)
        setHeaderString("Order history")
        OrderServices.getPreviousOrders(contextObject.currentUser.id)
            .then(data => {
                setOrderList(data)
            })
    }, [isFocused, shouldreload])
    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView>
                {orderList.map((item, key) => {
                    return <Ordergroup orderGroupIndex={key} key={key} setCurrentProduct={setCurrentProduct} popupBottomSheet={popupBottomSheet} orderInfo={item} navigator={props.navigation} />
                })}
            </ScrollView>
            <BottomSheet visible={bottomSheetVisibility}
                onBackButtonPress={() => {
                    detectChange(false)
                    popupBottomSheet(false)
                }}
                onBackdropPress={() => {
                    detectChange(false)

                    popupBottomSheet(false)
                }}
            >
                <View>
                    {currentlyFocusedProduct && <View style={styles.bottomNavigationView}>
                        <ScrollView>
                            <View style={{
                                flex: 1
                            }}>
                                <View style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignContent: "center",
                                    alignItems: "center",
                                    margin: 10,
                                    padding: 20,
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize: 20
                                        }}>{(currentlyFocusedProduct?.product.post.itemName)}</Text>
                                        <Text>{currentlyFocusedProduct?.product.amount}{currentlyFocusedProduct?.product.post.unitType}</Text>
                                    </View>
                                    <Image style={{
                                        height: 60,
                                        aspectRatio: 1,
                                        borderRadius: 60
                                    }} source={{
                                        uri: JSON.parse(currentlyFocusedProduct?.product.post.images)[0]
                                    }} />
                                </View>

                                <FlatList
                                    horizontal={true}
                                    data={JSON.parse(currentlyFocusedProduct?.product.post.images)}
                                    keyExtractor={image => image}
                                    renderItem={(image) => {
                                        return <View style={{
                                            padding: 5
                                        }}>
                                            <TouchableOpacity onPress={() => {

                                            }}>
                                                <Image source={{ uri: image.item }} style={{
                                                    width: 200,
                                                    aspectRatio: 1,

                                                }} />
                                            </TouchableOpacity>
                                        </View>

                                    }}
                                />
                                <TouchableOpacity style={{
                                    padding: 10,
                                    margin: 10,
                                    backgroundColor: "#c4c4c1",
                                    borderRadius: 5
                                }} onPress={() => {
                                    props.stackNav.push('Post details', {
                                        postId: currentlyFocusedProduct?.product.post.id,

                                    })
                                }}>
                                    <Text>View product</Text>
                                </TouchableOpacity>
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
                                        {ratingList.map((item, index) => {
                                            return <View key={index}>
                                                {(item + 1 <= currentlyFocusedProduct.rating) && <AntDesign onPress={() => {
                                                    detectChange(true)
                                                    setCurrentProduct({ ...currentlyFocusedProduct, rating: item + 1 })
                                                }} name="star" size={24} color="black" />}
                                                {(item + 1 > currentlyFocusedProduct.rating) && <AntDesign onPress={() => {
                                                    setCurrentProduct({ ...currentlyFocusedProduct, rating: item + 1 })
                                                    detectChange(true)
                                                }} name="staro" size={24} color="black" />}

                                            </View>
                                        })}
                                    </View>
                                </View>
                                {hasRatingChanged && <TouchableOpacity style={{
                                    padding: 10,
                                    margin: 10,
                                    backgroundColor: "#c4c4c1",
                                    borderRadius: 5
                                }} onPress={() => {
                                    RatingServices.rateItem(currentlyFocusedProduct?.product.post.id, contextObject.currentUser.id, currentlyFocusedProduct.rating, currentlyFocusedProduct?.product.post.postedBy, currentlyFocusedProduct?.product.post.tags)
                                        .then(() => {
                                            setOrderList([...orderList])
                                            ToastAndroid.showWithGravity(
                                                "Thank you for your rating!",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM
                                            )
                                        })
                                }}>
                                    <Text>Update rating</Text>
                                </TouchableOpacity>}
                            </View>
                        </ScrollView>

                    </View>}
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: Dimensions.get('window').height * 0.8,
        borderRadius: 10,
        padding: 10,

    },
})

export default OrderHistory;