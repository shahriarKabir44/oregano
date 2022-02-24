import React, { useState } from 'react';
import {TextInput} from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

import { View,Text,StyleSheet, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SelectedTags from './SelectedTags';

function RenderTag({children}){
    return (
        <View style={tagStyles.container} >
              {children}   
        </View>
    );
}

const tagStyles = StyleSheet.create({
    container: {
        borderColor: "#000000",
        borderRadius: 50,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin:2
    }
})
const availableTags=["chicken", "spicy","cake","pastry","pasta","indian","mexican"]
function Addtags(props) {
    const [searchText,setSeatchText]=useState("")
    const [selected,setSelected]=useState([])
    const [tags,setAvailableTags]=useState([...availableTags])
    function addTag(tag){
        if(selected.length<3) {
            setSelected([...selected,tag])
         
            setAvailableTags (tags.filter(name=>name!=tag))
        }
        
    }
    function removeTag(tagName){
        setSelected(selected.filter(name=>name!=tagName))
        let temp=availableTags
        for(let tag in selected){
            temp=temp.filter(name=>name!=tag)
        }
        setAvailableTags([...temp])
    }
    function search(query){
        setSeatchText(query)
        let temp=availableTags
        for(let tag in selected){
            temp=temp.filter(name=>name!=tag)
        }
        temp=temp.filter(name=>name.startsWith(query))
        setAvailableTags(temp)
    }
    return (
        <View style={{
            margin:10,
            backgroundColor:"white",
            flex:1,
            padding:10
        }}>
            <ScrollView>
                <TextInput
                    label="Tag name"
                    value={searchText}
                    onChangeText={text => search(text)}
                />
                {selected.length>0 && <View style={{
                    margin:10
                }}>
                    <Text style={{
                        fontSize:20
                    }}> Selected </Text>
                    <View style={{
                        display:"flex",
                        flexDirection:'row',
                        
                        }} >

                        {selected.map((name,index)=> <RenderTag key={index} children={ 
                            <View style={{
                                display:"flex",
                                flexDirection:'row',
                                
                            }}>
                                <Text> {name} </Text>
                                <Entypo   name="circle-with-cross" size={25} onPress={()=>{ 
                                    removeTag(name)
                                }}  />
                                </View>
                            } /> )}
                        </View>
                    </View> }
                <Text style={{
                    padding:5,
                    fontSize:25
                }}>Available tags:</Text>
                {tags.map((tagName,index)=>{
                    return <View key={index} style={{
                        margin:5
                    }}>
                        <Button title={tagName}  onPress={()=>{
                            addTag(tagName)
                        }} />
                    </View>
                })}
            </ScrollView>
            <TouchableOpacity onPress={()=>{
                SelectedTags.tagNames=selected
                props.navigation.goBack()
            }}>
				<View style={{
                    backgroundColor:"#FFA500",
                    height:60,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
					<Text style={{
						fontSize:20
					}}> Done! </Text>
				</View>
			</TouchableOpacity>
        </View>
    );
}

export default Addtags;