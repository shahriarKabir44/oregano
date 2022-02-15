 import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import Home from './components/Home';
import Header from './components/shared/Header';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();



function DrawerRoot() {
	return (
	  <Drawer.Navigator
	   screenOptions ={{
		 header: (prop)=><Header {...prop} />
	   }}>
		<Drawer.Screen name="Home" component={Home} />
	  </Drawer.Navigator>
	);
  }

export default function App() {
  return ( <NavigationContainer>
				<DrawerRoot />
			</NavigationContainer>
	);
}

 

const styles = StyleSheet.create({
   
});
