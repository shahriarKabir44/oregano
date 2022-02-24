import React, { useState } from 'react';
import { View ,Text, ScrollView, FlatList,Image, Button} from 'react-native';
import {TextInput} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
function CreatePost(props) {
	const [item,setItemProperty]=useState({
		itemName:"",
		tags:[],
		images:[],
		unitPrice:"",
		amountProduced:""
	})
	const [images,setImagesList]=useState([{index:4,body:null}])
	const [lastImageId,setLastImageId]=useState(0)
	async function handleUpload(){
		let result=await ImagePicker .launchImageLibraryAsync({
			mediaTypes:ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		})
		if(result){
			if(!result.cancelled){
				let newImage={
					body:result.uri,
					index: lastImageId
				}
				setImagesList([...images,newImage])
				 
				if(lastImageId==3)setLastImageId(5)
				else setLastImageId(lastImageId+1)
				 
			}
		}
	}
	function removeImage(index){
		setImagesList(images.filter(image=>image.index!=index))
	}
    return (
        <View style={{
            flex:1,
			backgroundColor:"#DFDFDF"
        }}>
             <ScrollView style={{
				 padding:15,
				 backgroundColor:"white"
			 }}>
                <TextInput
                    label="Item Name"
                    value={item.itemName}
                    onChangeText={text =>  setItemProperty({...item,itemName:text})}
                />
			{/* images section */}

			 <Text style={{
				 fontSize:20
			 }}>Add Images (4 max) </Text>

			 <FlatList 
			 	horizontal={true}
				 data={images}
			 	keyExtractor={photo=>photo.index}
				 renderItem={(image)=>{
					return <View style={{
						padding:10
					}}>
						{image.item.index==4 && images.length<=4 && <MaterialCommunityIcons onPress={()=>{
							handleUpload()
						}} name="image-plus" size={120} color="black" />}
						{image.item.index!=4 &&  <View>

							<Entypo name="circle-with-cross" style={{
								position:"absolute",
								top:-10,
								right:-10,
								zIndex:100,
							}} size={25} onPress={()=>{removeImage(image.item.index)}} color="black" />
							<Image style={{
								width:160,
								aspectRatio:4/3
							}} source={{
								uri: image.item.body
							}} /> 
						</View>  }
					</View>
				 }}
			 />
			<Button title='+ Add tags' onPress={()=>{
				props.navigation.push('Add tags')
			}} />
            </ScrollView>
        </View>
    );
}

export default CreatePost;