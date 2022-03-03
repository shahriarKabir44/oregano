import React, { useEffect, useState } from 'react';
import { View ,Text,Image,Dimensions,ScrollView, StyleSheet} from 'react-native';
import Globals from '../../Globals';
import postList from '../../postList';
import PostCardRoot from '../../shared/PostCardRoot';
import PostCardProfile from './PostCardProfile';
import PostCardRootProfile from './PostCardRootProfile';
function UserProfile(props) {
    const [userPosts,setPostList]=useState([])
    useEffect(()=>{
        Globals.getPostOfAUser()
            .then(posts=>{
                setPostList(posts)
            })
    },[])
    const UserProfileInfo={
        "facebookToken":{
            "name":"Fatima Khan",
            "profileImageURL":"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE",
            coverPhotoURL:"https://checkpoint.cvcheck.com/wp-content/uploads/Improve-employee-engagement-with-digital-apps.jpg",
            email:"firoza@gmail.com",
            phone:"12345",
            address:"Nirala, Khulna"
        },
        "id":"621413a308220b000e005185",
        followers:5,
        rating:3.4,
        totalItemsDelivered:10,
        followers:10
    }
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