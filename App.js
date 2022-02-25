 import {   StyleSheet  } from 'react-native';
import React from 'react'
import { NavigationContainer  } from '@react-navigation/native';


import StackNavigatorRoot from './components/navigators/StackNavigatorRoot';



export default function App() {
	return ( 
  		<NavigationContainer>
			  <StackNavigatorRoot />
		</NavigationContainer>
	);
}

 

const styles = StyleSheet.create({
   
});
