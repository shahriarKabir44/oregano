import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';

import React from 'react';
import Home from './Home';
import Header from './shared/Header';

import UserProfile from './menus/UserProfile'
import { SafeAreaView } from 'react-native-safe-area-context';
import { View,Image,StyleSheet,Text } from 'react-native';
import CreatePost from './menus/CreatePost';
import Favourites from './menus/Favourites'
import PreviousOrders from './menus/PreviousOrders';
const Drawer = createDrawerNavigator();
export default function DrawerRoot(props) {
	return (
		<Drawer.Navigator
			initialRouteName='Home'
		screenOptions ={{
			header: (prop)=><Header {...prop} />
		}}
			drawerContent={(props)=>{
				return <DrawerContentRoot {...props} />
			}}
		>
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Profile" component={UserProfile} />
			<Drawer.Screen name="Create a post" component={CreatePost} />
			<Drawer.Screen name='Favourites' component={Favourites} />
			<Drawer.Screen name='Order hsistoy' component={PreviousOrders} />
		</Drawer.Navigator>
			 
	);
  }

function DrawerContentRoot(props){
	const cookImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QfHXtZSr7Y9IoJWng-WknDoAHZxbxPC6QQ&usqp=CAU"
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{
				display:"flex",
				flexDirection:"row",
				justifyContent:"space-between",
				paddingHorizontal:10
			}} >
				<Image style={styles.sideMenuProfileIcon} source={{
					uri:cookImage
				}} />
				<Text
					style={{
						paddingVertical:15
					}}
				> Firoza Khan </Text>
			</View>
			<DrawerContentScrollView>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>

		</SafeAreaView>
	)
}


const styles=StyleSheet.create({
	sideMenuProfileIcon: {
		resizeMode: 'center',
		width: 50,
		height: 50,
		borderRadius: 100 / 2
	}
})