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
const Drawer = createDrawerNavigator();
export default function DrawerRoot() {
	return (
	  <Drawer.Navigator
		initialRouteName='Home'
	   screenOptions ={{
		 header: (prop)=><Header {...prop} />
	   }}>
        
		<Drawer.Screen name="Home" component={Home} />
		<Drawer.Screen name="Profile" component={UserProfile} />
	  </Drawer.Navigator>
	);
  }