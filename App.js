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

import {createStackNavigator} from '@react-navigation/stack'
import DrawerRoot from './components/DrawerRoot';

const Drawer = createDrawerNavigator();

const Stack=createStackNavigator()

function StackRoot(props){
	return <Stack.Navigator>
		<Stack.Screen name='HomeView' component={DrawerRoot } options={{
          header: (prop)=>{
			
            return <View></View>
          }
        }}/>
	</Stack.Navigator>
}

export default function App() {
	return ( 
  		<NavigationContainer>
			  <StackRoot />
		</NavigationContainer>
	);
}

 

const styles = StyleSheet.create({
   
});
