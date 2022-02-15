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
import Profile from './menu/Profile';

const Drawer = createDrawerNavigator();
export default function DrawerRoot() {
	return (
	  <Drawer.Navigator
	   screenOptions ={{
		 header: (prop)=><Header {...prop} />
	   }}>
        <Drawer.Screen name="Profile" component={Profile} />
		<Drawer.Screen name="Home" component={Home} />
	  </Drawer.Navigator>
	);
  }