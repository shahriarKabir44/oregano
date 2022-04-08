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
import CustomHeader from '../shared/CustomHeader';
import { RootContext } from '../contexts/GlobalContext';
import AssignedDeliveries from '../shared/AssignedDeliveries';
import DeliveryHistory from '../menus/DeliveryHistory';
import OrderHistory from '../menus/OrderHistory/OrderHistory';
const Drawer = createDrawerNavigator();
export default function DrawerRoot({ navigation }) {
	const { contextObject } = React.useContext(RootContext)

	const stackNavigator = navigation
	return (
		<Drawer.Navigator
			initialRouteName='Home'

			drawerContent={(props) => {
				return <DrawerContentRoot {...props} />
			}}
		>
			{contextObject.currentUser && <Drawer.Screen options={{
				header: (prop) => {
					return <Header {...prop} />
				},

			}} name="Home">
				{props => (<Home drawerNav={props.navigation} stackNav={stackNavigator} />)}
			</Drawer.Screen>}
			{contextObject.currentUser && <Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader goBackOnly={true} name={"Profile"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				}
			}} name="Profile" >
				{props => <UserProfile drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>}

			<Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Favourites"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				}
			}} name='Connections' >
				{props => <Favourites drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>

			{contextObject.currentUser && <Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Assigned Deliveries"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				},
				drawerItemStyle: {
					display: contextObject.currentUser.isRider ? 'flex' : 'none'
				}
			}} name="Assigned deliveries" >
				{props => <AssignedDeliveries drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>}

			{contextObject.currentUser && <Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Deliveries history"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				},
				drawerItemStyle: {
					display: contextObject.currentUser.isRider ? 'flex' : 'none'
				}
			}} name="Deliveries history" >
				{props => <DeliveryHistory drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>}

			<Drawer.Screen options={{
				header: (prop) => {
					return <CustomHeader name={"Order history"} stackNavigation={stackNavigator} drawerNavigation={prop.navigation} />
				}
			}} name="Order History" >
				{props => <OrderHistory drawerNav={props.navigation} stackNav={stackNavigator} />}
			</Drawer.Screen>

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
				{contextObject.currentUser && <Image style={styles.sideMenuProfileIcon} source={{
					uri: contextObject.currentUser.facebookToken.profileImageURL
				}} />}
				{contextObject.currentUser && <Text
					style={{
						paddingVertical: 15
					}}
				> {contextObject.currentUser.facebookToken.name} </Text>}
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