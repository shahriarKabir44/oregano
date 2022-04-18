import { SafeAreaView, FlatList, Button, Dimensions, ScrollView, RefreshControl, Text, View, StyleSheet, LogBox, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { TextInput } from 'react-native-paper'
import Global from '../../services/Globals';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import RemovableTag from './RemovableTag';
import PostService from '../../services/PostService';
import { RootContext } from '../contexts/GlobalContext';
function MarkAvailableItemsBottomSheet(props) {
    return (
        <BottomSheet visible={props.bottomSheetVisibility}
            onBackButtonPress={() => {

                props.popupBottomSheet(false)
            }}
            onBackdropPress={() => {


                props.popupBottomSheet(false)
            }}
        >
            <View style={{
                maxHeight: Dimensions.get('window').height * .9,

            }}>
                <View style={[styles.bottomNavigationView, { height: "100%" }]}>
                    <View style={{
                        display: 'flex',
                        flexDirection: "row",
                        alignItems: "center",
                        alignContent: "center"
                    }}>
                        <Entypo onPress={() => {
                            props.popupBottomSheet(false)
                        }} name="circle-with-cross" size={30} color="black" />
                        <Text style={{
                            fontSize: 20
                        }}>Today's available items</Text>
                    </View>
                    {props.bottomSheetVisibility && <RenderMainComponent {...props} />}
                </View>
            </View>
        </BottomSheet>
    );
}


function RenderMainComponent(props) {
    const { getCurrentuser } = React.useContext(RootContext)
    const [searchText, setSeatchText] = React.useState("")
    const [selected, setSelected] = React.useState([])
    const [availableTags, setAvailableTagList] = React.useState([])

    const [doesSearchExist, setExistence] = React.useState(true)

    const [tags, setAvailableTags] = React.useState([])
    function getAvailableTags() {
        PostService.getAvailableItemsToday(getCurrentuser().id)
            .then(data => {
                console.log(data);
                setSelected(data)
            })
    }
    React.useEffect(() => {
        getAvailableTags()
        fetch(Global.SERVER_URL + '/getAvailableTags')
            .then(response => response.json())
            .then(({ data }) => {
                setAvailableTagList(data)
                return data
            })
            .then((data) => {
                let tempAvailable = data

                setAvailableTags(tempAvailable)
            })
    }, [])
    /**
     * 
     * @param {String} tag 
     */
    function addTag(tag) {
        tag = tag.toLowerCase()
        setSelected([...selected, tag.toLowerCase()])
        setAvailableTags(tags.filter(name => name != tag))
    }
    function removeTag(tagName) {
        tagName = tagName.toLowerCase()
        setSelected(selected.filter(name => name != tagName))
        let temp = availableTags
        for (let tag in selected) {
            temp = temp.filter(name => name != tag)
        }
        setAvailableTags([...temp])
    }
    function search(query) {
        query = query.toLowerCase()
        setSeatchText(query)
        let temp = availableTags
        for (let tag of selected) {
            temp = temp.filter(name => name != tag)
        }
        temp = temp.filter(name => name.startsWith(query))
        setAvailableTags(temp)
        if (!temp.length) setExistence(1 == 0)
        else setExistence(1 == 1)
    }
    return (<View style={{
        margin: 10,
        backgroundColor: "white",
        flex: 1,
        padding: 10
    }}>
        <TextInput
            label="Tag name"
            value={searchText}
            onChangeText={text => search(text)}
        />
        {selected.length > 0 && <View style={{
            margin: 10
        }}>
            <Text style={{
                fontSize: 20
            }}> Selected </Text>
            <View style={{

            }} >

                <FlatList
                    horizontal={true}
                    data={selected}
                    keyExtractor={tag => tag}
                    renderItem={(tag) => {
                        return <RemovableTag name={tag.item} removeTag={() => {
                            removeTag(tag.item)
                        }} />

                    }}
                />


            </View>
        </View>}
        <Text style={{
            padding: 5,
            fontSize: 25
        }}>Available tags:</Text>
        <ScrollView>

            {!doesSearchExist && <View>
                <TouchableOpacity style={[styles.alighnHorizontal, {
                    paddingHorizontal: 10
                }]} onPress={() => {
                    addTag(searchText)
                    search("")
                }} >
                    <View style={styles.updateAmountBtn}>
                        <Text style={{
                            fontSize: 20
                        }}>+</Text>
                    </View>

                    <Text style={{
                        fontSize: 20,
                        marginLeft: 20
                    }}>Add tag "{searchText}"</Text>
                </TouchableOpacity>
            </View>}
            {doesSearchExist && <View>
                {tags.map((tagName, index) => {
                    return <View key={index} style={{
                        margin: 5
                    }}>
                        <Button title={tagName} onPress={() => {
                            addTag(tagName)
                        }} />
                    </View>
                })}
            </View>}
        </ScrollView>


        <TouchableOpacity onPress={() => {
            PostService.setAvailableItemsToday(getCurrentuser().id, selected)
        }}>
            <View style={{
                backgroundColor: "#FFA500",
                height: 40,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 20
                }}> Done! </Text>
            </View>
        </TouchableOpacity>
    </View>)
}


const styles = StyleSheet.create({
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',

        borderRadius: 10,
        padding: 10,

    },
})

export default MarkAvailableItemsBottomSheet;