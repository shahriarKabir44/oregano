import { StyleSheet } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';


import StackNavigatorRoot from './components/navigators/StackNavigatorRoot';
import GlobalContext from './components/contexts/GlobalContext';



export default function App() {
	return (
		<GlobalContext>
			<NavigationContainer>
				<StackNavigatorRoot />
			</NavigationContainer>
		</GlobalContext>
	);
}



const styles = StyleSheet.create({

});
