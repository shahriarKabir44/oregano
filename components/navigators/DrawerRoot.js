import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';

import React from 'react';
import Home from '../Home';
import Header from '../shared/Header';

import UserProfile from '../menus/UserProfile/UserProfile'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, StyleSheet, Text } from 'react-native';
import CreatePost from '../menus/CreatePost';
import Favourites from '../menus/Favourites'
import PreviousOrders from '../menus/PreviousOrders';
import CustomHeader from '../shared/CustomHeader';
import { RootContext } from '../contexts/GlobalContext';
const Drawer = createDrawerNavigator();
export default function DrawerRoot({ navigation }) {
	const stackNavigator = navigation
	return (
		<Drawer.Navigator
			initialRouteName='Home'

			drawerContent={(props) => {
				return <DrawerContentRoot {...props} />
			}}
		>
			<Drawer.Screen options={{
				header: (prop) => {
					return <Header {...prop} />
				},

			}} name="Home">
				{props => (<Home drawerNav={props.navigation} stackNav={stackNavigator} />)}
			</Drawer.Screen>
			<Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Profile"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				}
			}} name="Profile" >
				{props => <UserProfile drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>

			<Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Favourites"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				}
			}} name='Connections' component={Favourites} />
			<Drawer.Screen name='Order History' component={PreviousOrders} />
		</Drawer.Navigator>

	);
}

function DrawerContentRoot(props) {
	const { updateContext, contextObject } = React.useContext(RootContext)
	const cookImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QfHXtZSr7Y9IoJWng-WknDoAHZxbxPC6QQ&usqp=CAU"
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				paddingHorizontal: 10
			}} >
				<Image style={styles.sideMenuProfileIcon} source={{
					uri: contextObject.currentUser.facebookToken.profileImageURL
				}} />
				<Text
					style={{
						paddingVertical: 15
					}}
				> {contextObject.currentUser.facebookToken.name} </Text>
			</View>
			<DrawerContentScrollView>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	sideMenuProfileIcon: {
		resizeMode: 'center',
		width: 50,
		height: 50,
		borderRadius: 100 / 2
	}
})