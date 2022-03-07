import React from 'react';
import DrawerRoot from '../navigators/DrawerRoot';
import CustomHeader from '../shared/CustomHeader';
import CreatePost from '../menus/CreatePost';
import Addtags from '../menus/Addtags';
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native';
import CartListView from '../routed/CartListView'
import PostDetails from '../routed/PostDetails'
import UserProfile from '../menus/UserProfile/UserProfile';
const Stack = createStackNavigator()
import { RootContext } from '../contexts/GlobalContext'
import ResultsRoot from '../routed/searchResult/ResultsRoot';

function StackNavigatorRoot(props) {
	const rootContext = React.useContext(RootContext)
	return <Stack.Navigator>
		<Stack.Screen name='HomeView' component={DrawerRoot} options={{
			header: (prop) => {

				return <View></View>
			}
		}} />
		<Stack.Screen name='Post details' options={{
			header: (prop) => {
				return <CustomHeader stackNavigation={prop.navigation} name={"Post details"} />
			}
		}} component={PostDetails} />
		<Stack.Screen name='Create post' options={{
			header: props => <CustomHeader stackNavigation={props.navigation} name={"Create Post"} />
		}} component={CreatePost} />
		<Stack.Screen name='Add tags' component={Addtags} />
		<Stack.Screen name='Cart'
			options={{
				header: props => <CustomHeader stackNavigation={props.navigation} name={"Cart"} />
			}}
		>
			{(props) => {

				return <CartListView {...props} />
			}}
		</Stack.Screen>

		<Stack.Screen name='profile'
			options={{
				header: props => <CustomHeader stackNavigation={props.navigation} />
			}}
		>
			{(props) => {

				return <UserProfile stackNav={props.navigation}  {...props} />
			}}
		</Stack.Screen>
		<Stack.Screen name='searchResult'
			options={{
				header: props => <CustomHeader stackNavigation={props.navigation} />
			}}
		>
			{(props) => {

				return <ResultsRoot stackNav={props.navigation}  {...props} />
			}}
		</Stack.Screen>
	</Stack.Navigator>
}


export default StackNavigatorRoot;