
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import StackNavigatorRoot from './components/navigators/StackNavigatorRoot';
import GlobalContext, { RootContext } from './components/contexts/GlobalContext';
import UnauthorizedView from './components/UnauthorizedView';



export default function App() {
	const [isAuthorized, setAuthorization] = React.useState(false)

	return (
		<GlobalContext>
			{isAuthorized && <NavigationContainer>
				<StackNavigatorRoot setAuthorization={setAuthorization} />
			</NavigationContainer>}
			{!isAuthorized && <UnauthorizedView setAuthorization={setAuthorization} />}
		</GlobalContext>
	);
}




const styles = StyleSheet.create({

});
