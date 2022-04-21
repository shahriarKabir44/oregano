
import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import Home from '../Home';
import SearhcItemsRoot from '../routed/search/SearhcItemsRoot';
const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
    return (

        <Tab.Navigator
            initialRouteName='Gallery'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    let iconName;

                    if (route.name == 'Gallery') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    } else if (route.name === 'Search items') {
                        iconName = focused ? 'search1' : 'search1';
                    }

                    // You can return any component that you like here!
                    return <AntDesign name={iconName} size={24} color="black" />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen options={{
                header: (prop) => {
                    return <View></View>
                }
            }} name="Gallery" >
                {(childProp) => <Home {...props} tabNav={childProp.navigation} />}

            </Tab.Screen>
            <Tab.Screen options={{
                header: (prop) => {
                    return <View></View>
                }
            }} name="Search items"  >
                {(childProp) => <SearhcItemsRoot tabNav={childProp.navigation} tabNavRoute={childProp.route} {...props} />}
            </Tab.Screen>
        </Tab.Navigator>

    );
}


