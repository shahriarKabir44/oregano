import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, Button, TouchableOpacity, ToastAndroid, Modal } from 'react-native';
import { TextInput } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import RemovableTag from '../shared/RemovableTag';
import { Picker } from '@react-native-picker/picker';
import TagsSelectionService from '../../services/TagsSelectionService';
import { useIsFocused } from '@react-navigation/native';
import { RootContext } from '../contexts/GlobalContext'
import LocationService from '../../services/LocationService';
import PostService from '../../services/PostService';

function CreatePost(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const isFocused = useIsFocused()
	const rootContext = React.useContext(RootContext)
	const [item, setItemProperty] = useState({
		itemName: "",
		tags: [],
		images: "",
		unitPrice: "",
		amountProduced: "",
		unitType: "Units",
		country: "",
		district: "",
		city: "",
		latitude: "",
		longitude: "",
		postedOn: "",
		postedBy: "",
	})
	const [currentLocation, setCurrentLocation] = React.useState({})
	const [currentGeocode, setCurrentGeocode] = React.useState({
		country: "",
		district: "",
		city: "",
	})
	async function setGeoInfo() {
		let coords = await LocationService.getCurrentLocation()
		setCurrentLocation({
			latitude: coords.latitude,
			longitude: coords.longitude
		})

		let geocode = await LocationService.getLocationGeocode(coords)
		let locationInfo = {
			...coords,
			district: geocode[0].district ? geocode[0].district : "California", city: geocode[0].city, country: geocode[0].country
		}
		return locationInfo

	}
	useEffect(() => {
		if (isFocused) {

			setItemProperty({ ...item, postedBy: rootContext.contextObject.currentUser.id })
			rootContext.updateContext({ ...rootContext.contextObject, headerString: "Create a post" })
			setItemProperty({ ...item, tags: props.route.params ? [...props.route.params.tags] : [] })
		}

	}, [isFocused])
	const [images, setImagesList] = useState([
		{
			index: 4,
			body: null,
			type: "",
			base64: ""
		}])
	const [lastImageId, setLastImageId] = useState(0)
	async function handleUpload() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true
		})
		if (result) {
			if (!result.cancelled) {
				let imageUriSplit = result.uri.split(".")
				let newImage = {
					body: result.uri,
					index: lastImageId,
					base64: `data:image/${imageUriSplit[imageUriSplit.length - 1]};base64,${result.base64}`,
					type: imageUriSplit[imageUriSplit.length - 1],
				}
				setImagesList([...images, newImage])
				if (lastImageId == 3) setLastImageId(5)
				else setLastImageId(lastImageId + 1)

			}
		}
	}
	function removeImage(index) {
		setImagesList(images.filter(image => image.index != index))
	}
	return (
		<View style={{
			flex: 1,
			backgroundColor: "#DFDFDF"
		}}>
			<Modal
				animationType="slide"
				transparent={1 == 1}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Please wait...</Text>

					</View>
				</View>
			</Modal>
			<ScrollView style={{

				backgroundColor: "white",
				margin: 10,
				borderRadius: 10,
				overflow: "scroll"
			}}>
				<View style={{
					flex: 1,
					padding: 10
				}}>
					{isFocused && <View>
						<Text></Text>
					</View>}
					<TextInput
						label="Item Name"
						value={item.itemName}
						onChangeText={text => setItemProperty({ ...item, itemName: text })}
					/>
					{/* images section */}

					<Text style={{
						fontSize: 20
					}}>Add Images (4 max) </Text>

					<FlatList
						horizontal={true}
						data={images}
						keyExtractor={photo => photo.index}
						renderItem={(image) => {
							return <View style={{
								padding: 10
							}}>
								{image.item.index == 4 && images.length <= 4 && <MaterialCommunityIcons onPress={() => {
									handleUpload()
								}} name="image-plus" size={120} color="black" />}
								{image.item.index != 4 && <View>

									<Entypo name="circle-with-cross" style={{
										position: "absolute",
										top: -10,
										right: -10,
										zIndex: 100,
									}} size={25} onPress={() => { removeImage(image.item.index) }} color="black" />
									<Image style={{
										width: 160,
										aspectRatio: 4 / 3
									}} source={{
										uri: image.item.body
									}} />
								</View>}
							</View>
						}}
					/>
					<Button title='+ Add tags' onPress={() => {
						TagsSelectionService.setTagList(item.tags)
						props.navigation.push('Add tags', {
							selectedNames: item.tags
						})
					}} />
					{item.tags.length > 0 && <View style={{
						margin: 10
					}}>
						<Text>Added tags</Text>
						<View style={{
							display: "flex",
							flexDirection: "row"
						}}>
							{item.tags.map((tag, index) => <RemovableTag key={index} name={tag} removeTag={() => {
								setItemProperty({ ...item, tags: item.tags.filter(name => name != tag) })
							}} />)}
						</View>
					</View>}

					<View style={{
						marginVertical: 20,

					}}>
						<TextInput
							keyboardType="numeric"
							label="Amount Produced"
							value={item.amountProduced}
							onChangeText={text => setItemProperty({ ...item, amountProduced: text })}
						/>
						<Picker
							selectedValue={item.unitType}

							onValueChange={(itemValue, itemIndex) => setItemProperty({ ...item, unitType: itemValue })}
						>
							<Picker.Item label="Units" value="Units" />
							<Picker.Item label="Kgs" value="Kgs" />
						</Picker>
					</View>
					<View>
						<TextInput
							keyboardType="numeric"
							label="Price"
							value={item.unitPrice}
							onChangeText={text => setItemProperty({ ...item, unitPrice: text })}
						/>
					</View>
				</View>
			</ScrollView>

			<TouchableOpacity onPress={() => {
				//setModalVisible(1 == 1)
				setGeoInfo()
					.then((locationData) => {
						let newPost = {
							...item,
							...locationData,
							postedBy: rootContext.contextObject.currentUser.id,
							tags: JSON.stringify(item.tags),
							postedOn: (new Date()) * 1

						};
						return newPost
					})
					.then(newPost => {
						setModalVisible(true);
						PostService.createPost(newPost)
							.then(({ data }) => {
								PostService.uploadImages(images, newPost.postedBy, data._id, newPost.postedOn)
									.then(resp => {
										setModalVisible(false);

									})
									.then(() => {
										ToastAndroid.showWithGravity(
											"Post created succesfully!",
											ToastAndroid.SHORT,
											ToastAndroid.BOTTOM
										)
										props.navigation.navigate('HomeView')
									})
							})
					})




			}}>
				<View style={{
					backgroundColor: "#FFA500",
					height: 60,
					justifyContent: "center",
					alignItems: "center"
				}}>
					<Text style={{
						fontSize: 20
					}}> Post! </Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		textAlign: "center"
	}
})
export default CreatePost;