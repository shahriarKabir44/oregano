import React, { useState } from 'react';
import { View ,Text, ScrollView, FlatList,Image, Button,Picker,TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import SelectedTags from './SelectedTags';
import RemovableTag from '../shared/RemovableTag';
import { Dimensions } from 'react-native';


function CreatePost(props) {
	const [item,setItemProperty]=useState({
		itemName:"",
		tags:SelectedTags.tagNames,
		images:[],
		unitPrice:"",
		amountProduced:"",
		amountType:"Units"
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
				 backgroundColor:"white",
				 margin:10,
				 borderRadius:10
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
				SelectedTags.tagNames=item.tags
				props.navigation.push('Add tags')
			}} />
			{item.tags.length>0 && <View style={{
				margin:10
			}}>
				<Text>Added tags</Text>
				<View style={{
					display:"flex",
					flexDirection:"row"
				}}>
				{ item.tags.map((tag,index)=> <RemovableTag key={index} name={tag} removeTag={()=>{
					setItemProperty({...item,tags:item.tags.filter(name=>name!=tag)})
				}} /> ) }
				</View>
			</View>}

			<View style={{
				marginVertical:20,
				 
			}}>
				<TextInput 
                    label="Amount Produced"
                    value={item.amountProduced}
                    onChangeText={text =>  setItemProperty({...item,amountProduced:text})}
                />
				 <Picker
					selectedValue={item.amountType}
					 
					onValueChange={(itemValue, itemIndex) => setItemProperty({...item,amountType:itemValue})}
				>
					<Picker.Item label="Units" value="Units" />
					<Picker.Item label="Kgs" value="Kgs" />
				</Picker>
			</View>
			<View>
				<TextInput 
                    label="Price"
                    value={item.unitPrice}
                    onChangeText={text =>  setItemProperty({...item,unitPrice:text})}
                />
			</View>
            </ScrollView>

			<TouchableOpacity onPress={()=>{
                
            }}>
				<View style={{
                    backgroundColor:"#FFA500",
                    height:60,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
					<Text style={{
						fontSize:20
					}}> Post! </Text>
				</View>
			</TouchableOpacity>
        </View>
    );
}

export default CreatePost;