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
import DrawerRoot from './components/DrawerRoot';

const Drawer = createDrawerNavigator();





export default function App() {
	return ( 
  		<NavigationContainer>
			  <DrawerRoot />
		</NavigationContainer>
	);
}

 

const styles = StyleSheet.create({
   
});
