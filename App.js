
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Text, View, Button, Platform, StyleSheet } from 'react-native';
import StackNavigatorRoot from './components/navigators/StackNavigatorRoot';
import GlobalContext, { RootContext } from './components/contexts/GlobalContext';
import RegistrationPhase0 from './components/unauthorized/RegistrationPhase0';
import PhoneVerification from './components/unauthorized/PhoneVerification';
import LocalStorageService from './services/LocalStorageService';



export default function App() {
	const [isAuthorized, setAuthorization] = React.useState(false)
	const [registrationStep, setRegistrationStep] = React.useState(0)
	React.useEffect(() => {
		LocalStorageService.get('isLoggedIn')
			.then(status => {
				console.log(status == true);
				setAuthorization(status == true);
			})
	}, [])
	return (
		<GlobalContext>

			{!isAuthorized && registrationStep == 0 && <RegistrationPhase0 setRegistrationStep={setRegistrationStep} setAuthorization={setAuthorization} />}
			{!isAuthorized && registrationStep == 1 && <PhoneVerification setRegistrationStep={setRegistrationStep} setAuthorization={setAuthorization} />}
			{isAuthorized && <NavigationContainer>
				<StackNavigatorRoot setAuthorization={setAuthorization} />
			</NavigationContainer>}
		</GlobalContext>
	);
}




const styles = StyleSheet.create({

});
