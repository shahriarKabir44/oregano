import React from 'react';
import DrawerRoot from '../navigators/DrawerRoot';
import CustomHeader from '../shared/CustomHeader';
import CreatePost from '../menus/CreatePost';
import Addtags from '../menus/Addtags';
import {createStackNavigator} from '@react-navigation/stack'
import {  View } from 'react-native';

import PostDetails from '../routed/PostDetails'
const Stack= createStackNavigator()
function StackNavigatorRoot(props){
	return <Stack.Navigator>
		<Stack.Screen name='HomeView' component={DrawerRoot } options={{
          header: (prop)=>{
		
            return <View></View>
          }
        }}/>
		<Stack.Screen name='Post details' options={{
			header: (prop)=>{
				return <CustomHeader stackNavigation={prop.navigation} name={"Post details"}  />
			}
		}} component={PostDetails}   />
		<Stack.Screen name='Create post' options={{
			header:props=> <CustomHeader stackNavigation={props.navigation} name={"Create Post"}  />
		}} component={CreatePost} />
		<Stack.Screen name='Add tags' component={Addtags} />
	</Stack.Navigator>
}


export default StackNavigatorRoot;