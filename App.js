
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import StackNavigatorRoot from './components/navigators/StackNavigatorRoot';
import GlobalContext, { RootContext } from './components/contexts/GlobalContext';
import UnauthorizedView from './components/UnauthorizedView';



export default function App() {


	return (
		<GlobalContext>
			{/* <NavigationContainer>
				<StackNavigatorRoot />
			</NavigationContainer> */}
			<UnauthorizedView />
		</GlobalContext>
	);
}




const styles = StyleSheet.create({

});
