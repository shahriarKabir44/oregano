import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import SearchingServices from '../../../services/SearchingServices';
import { Ionicons } from '@expo/vector-icons';
import ResultBottomSheet from './ResultBottomSheet';
import CartServices from '../../../services/CartServices';
import LocalStorageService from '../../../services/LocalStorageService';
function SearhcItemsRoot(props) {
    const [collapsibleVisibility, setCollapsibleVisibility] = React.useState(false)
    function limitText(text) {
        let res = ""
        for (let n = 0; n < Math.min(10, text.length); n++) {
            res += text[n]
        }
        if (text.length > 10) res += "..."
        return res
    }
    const [searchText, setSearchText] = React.useState("")
    const [searchResult, setSearchResult] = React.useState([])
    const [selectedSearchResult, setSearchResultItem] = React.useState(null)
    const [dropDownVisibility, popupBottomSheet] = React.useState(false)
    function search(query) {
        setSearchText(query)
        SearchingServices.SearhcItems(query)
            .then(data => {
                setSearchResult(data)
            })
    }
    return (
        <View style={{
            flex: 1
        }}>
            <TextInput
                label="Item Name"
                value={searchText}
                onChangeText={text => search(text)}
            />
            <View style={{
                flex: 1,
                padding: 5
            }}>
                <ScrollView>
                    {searchResult.map((result, index) => {
                        return (<TouchableOpacity onPress={() => {
                            SearchingServices.getDetails(result.vendor.Id, result.itemName)
                                .then(searchResultInfo => {
                                    setSearchResultItem(searchResultInfo)
                                    return searchResultInfo
                                }).then((searchResultInfo) => {
                                    CartServices.isAddedToCart(result.vendor.Id + "", result.itemName)
                                        .then(cartData => {
                                            setSearchResultItem({ ...searchResultInfo, amount: null })
                                            if (cartData) {
                                                setSearchResultItem({ ...searchResultInfo, amount: cartData })
                                            }
                                        })
                                        .then(() => {
                                            popupBottomSheet(true)
                                        })
                                    // LocalStorageService.removeItem('storedCookDatas')
                                    // LocalStorageService.removeItem('storedItems')
                                })

                        }} style={[styles.horizontalAlign, {
                            backgroundColor: "#EBFDEF",
                            borderRadius: 10,
                            padding: 10,
                            margin: 10
                        }]} key={index}>
                            <Image style={{
                                height: 80,
                                aspectRatio: 1,
                                borderRadius: 50
                            }} source={{
                                uri: result.getLastPost ? JSON.parse(result.getLastPost.images)[0] : "https://previews.123rf.com/images/takasumi/takasumi1510/takasumi151000226/46196249-%E3%83%87%E3%82%A3%E3%83%8A%E3%83%BC%E7%9A%BF%E3%80%81%E3%83%8A%E3%82%A4%E3%83%95%E3%80%81%E3%82%B9%E3%83%97%E3%83%BC%E3%83%B3%E3%80%81%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88-%E3%83%90%E3%83%83%E3%82%AF-%E3%82%B0%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%81%AB%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AF.jpg"
                            }} />
                            <View style={[styles.horizontalAlign, {
                                justifyContent: "space-between",
                                flex: 1,
                                padding: 10
                            }]}>
                                <View>
                                    <View style={styles.horizontalAlign}>
                                        <Text>{result.itemName}</Text>
                                        <Text>Tk.{result.unitPrice}</Text>
                                    </View>
                                    <Text>{result.rating}⭐</Text>
                                    <View style={styles.horizontalAlign}>
                                        <Ionicons name="person" size={15} color="black" />
                                        <Text>{result.ratedBy}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginLeft: 40
                                }}>
                                    <Text>Prepared by:</Text>
                                    <View style={[styles.horizontalAlign, {
                                        justifyContent: "space-around",

                                    }]}>
                                        <Image style={{
                                            height: 30,
                                            aspectRatio: 1,
                                            borderRadius: 30,
                                            marginRight: 20
                                        }} source={{ uri: JSON.parse(result.vendor.facebookToken).profileImageURL }} />
                                        <Text>{limitText(result.vendor.name)}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>
            <ResultBottomSheet {...props} bottomSheetVisibility={dropDownVisibility} popupBottomSheet={popupBottomSheet} selectedSearchResult={selectedSearchResult} setSearchResultItem={setSearchResultItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    horizontalAlign: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
    }
})

export default SearhcItemsRoot;