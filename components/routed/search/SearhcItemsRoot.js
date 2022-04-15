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
                                            console.log(cartData);
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
                                uri: result.getLastPost.lastPost.images[0]
                            }} />
                            <View style={[styles.horizontalAlign, {
                                justifyContent: "space-between",
                                flex: 1,
                                padding: 10
                            }]}>
                                <View>
                                    <View style={styles.horizontalAlign}>
                                        <Text>{result.itemName}</Text>
                                        <Text>Tk.{result.price}</Text>
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
                                            borderRadius: 30
                                        }} source={{ uri: result.vendor.facebookToken.profileImageURL }} />
                                        <Text>{result.vendor.name}</Text>
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