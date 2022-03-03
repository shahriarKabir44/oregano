import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import PostCard from './PostCard';

export default function PostCardRoot(props) {
    // const [postList,setPostList]=useState([])
    // useEffect(()=>{
    //     fetch('http://192.168.43.90:3000/graphql',{
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             query:`query{
    //                 getPosts {
    //                     itemName
    //                     images
    //                     owner{
    //                       facebookToken
    //                       id
    //                     }
    //                     id
    //                     amountProduced
    //                     unitPrice
    //                     isPopular
    //                     tags
    //                   } 
    //             }`
    //         })
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         let actualData=data.data.getPosts
    //         for(let n =0;n<actualData.length;n++){
    //             actualData[n].tags = (JSON.parse (actualData[n].tags) )
    //             actualData[n].images=(JSON.parse (actualData[n].images) )
    //             actualData[n].owner.facebookToken=(JSON.parse (actualData[n].owner.facebookToken) )
    //        }
    //          setPostList(actualData)
    //          console.log(JSON.stringify(actualData))
    //     })
    // },[])
    function renderCard(post){
        return <PostCard {...props} post={post } />
    }
    return (
        <View>
            <FlatList 
                horizontal={true}
                data={props.postList} 
                keyExtractor={post=>post.id}
                renderItem={ renderCard}
            />  
             
        </View>
    );
}

