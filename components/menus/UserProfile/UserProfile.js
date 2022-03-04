import React, { useEffect, useState } from 'react';
import { View ,Text,Image,Dimensions,ScrollView, StyleSheet} from 'react-native';
import Globals from '../../Globals';
 import { RootContext } from '../../contexts/GlobalContext';

import PostCardRootProfile from './PostCardRootProfile';
import UserService from '../../../services/UserService';
function UserProfile(props) {
    const rootContext=React.useContext(RootContext)
    const [UserProfileInfo,setUserInfo]=useState({
        "facebookToken":{
            "name":"",
            "profileImageURL":"",
            coverPhotoURL:"",
            email:"",
            phone:"",
            address:""
        },
        "id":"",
        followers:0,
        rating:0,
        totalItemsDelivered:0,
        
    })
    const [userPosts,setPostList]=useState([])
    useEffect(()=>{
        if(!props.stackNav.route?.params?.id){
            console.log('first')
            setUserInfo(rootContext.contextObject.currentUser)
            rootContext.updateContext({...rootContext.contextObject, headerString:'Your profile'})
        }
        else if(rootContext.contextObject.currentUser.id!=props.stackNav.route?.params?.id){
            UserService.findUser(props.stackNav.route?.params?.id)
                .then(data=>{
                    setUserInfo(data)
                    rootContext.updateContext({...rootContext.contextObject, headerString:data.facebookToken.name})

                })
        }
        Globals.getPostOfAUser(UserProfileInfo.id)
            .then(posts=>{
                setPostList(posts)
            })
    },[])
     
    return (
        <View style={{
            flex:1
        }}>
            <ScrollView>
                <View>
                    <View style={{
                        height:Dimensions.get('window').width*9/16+Dimensions.get('window').width*.2
                    }} >
                        <Image style={{
                            width:'100%',
                            aspectRatio:16/9
                        }} source={{
                            uri: UserProfileInfo.facebookToken.coverPhotoURL
                        }} />
                        <Image style={{
                            width:'40%',
                            aspectRatio:1,
                            borderRadius:100,
                            position:"absolute",
                            top:Dimensions.get('window').width*9/16-Dimensions.get('window').width*.2,
                            alignSelf:"center"
                        }}  source={{
                            uri:UserProfileInfo.facebookToken.profileImageURL
                        }} />
                    </View>            
                    <View style={{
                        alignItems:"center",
                        
                        }}>
                        <Text style={{
                        
                            fontSize:30
                        }}> {UserProfileInfo.facebookToken.name}</Text>
                        <Text>
                            {UserProfileInfo.facebookToken.email}
                        </Text>
                        <Text>
                            {UserProfileInfo.facebookToken.phone}
                        </Text>
                        <Text>
                            {UserProfileInfo.facebookToken.address}
                        </Text>
                    </View>
                </View>

                <View style={{
                    padding:10
                }}>
                    <Text style={{
                        fontSize:20
                    }}> Your stats </Text>
                    <View style={[styles.horizontalAlign,{
                        marginTop:10
                    }]}>
                        <Text>Ratings</Text>
                        <Text>{UserProfileInfo.rating}⭐</Text>
                    </View>
                    <View style={styles.horizontalAlign}>
                        <Text>Followers:</Text>
                        <Text>{UserProfileInfo.followers}</Text>
                    </View>
                </View>
                <View style={{
                    padding:10
                }}>
                    <PostCardRootProfile {...props} postList={userPosts} />
                </View>
            </ScrollView>
        </View>
    );
}
const styles=StyleSheet.create({
    horizontalAlign:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between"
    }
})
export default UserProfile;