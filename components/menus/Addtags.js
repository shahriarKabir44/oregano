import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

import { View, Text, StyleSheet, Button, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

import RemovableTag from '../shared/RemovableTag';
import Global from '../../services/Globals';


function Addtags(props) {
    const [searchText, setSeatchText] = useState("")
    const [selected, setSelected] = useState([])
    const [availableTags, setAvailableTagList] = useState([])

    const [doesSearchExist, setExistence] = useState(true)

    const [tags, setAvailableTags] = useState([])
    useEffect(() => {
        setSelected(props.selectedNames)
        fetch(Global.SERVER_URL + '/getAvailableTags')
            .then(response => response.json())
            .then(({ data }) => {
                setAvailableTagList(data)
                return data
            })
            .then((data) => {
                let tempAvailable = data
                for (let tag of props.selectedNames) {
                    tempAvailable = tempAvailable.filter(tagName => tagName != tag)
                }
                setAvailableTags(tempAvailable)
            })

    }, [])
    /**
     * 
     * @param {String} tag 
     */
    function addTag(tag) {
        tag = tag.toLowerCase()
        if (selected.length < 3) {
            setSelected([...selected, tag])

            setAvailableTags(tags.filter(name => name != tag))
        }

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
    return (
        <View style={{
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
                props.setSelectedTags(selected)
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
        </View>
    );
}

const styles = StyleSheet.create({
    updateAmountBtn: {
        backgroundColor: "#FA01FF",
        height: 40,
        aspectRatio: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    alighnHorizontal: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        alignContent: "center",
        alignItems: "center"
    }
})

export default Addtags;