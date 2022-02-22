import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import PostCard from './PostCard';
 
const posts = [
    {
        Id:1,
        cardImg: "https://img.taste.com.au/FBczi1cs/w1200-h630-cfill/taste/2018/08/smarties-chocolate-cake-139872-2.jpg",
        itemName: "cake",
        cook: {
            name: "Firoza Khan",
            cookImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QfHXtZSr7Y9IoJWng-WknDoAHZxbxPC6QQ&usqp=CAU"
        },
        isPopular: 1,
        tags: [{ name: "chicken" ,Id:0 },{ name: "spicy" ,Id:1 }],
        price: 500,
        distance: 5,
        available: 3
    },
    {
        Id:2,
        cardImg: "https://img.taste.com.au/FBczi1cs/w1200-h630-cfill/taste/2018/08/smarties-chocolate-cake-139872-2.jpg",
        itemName: "cake",
        cook: {
            name: "Firoza Khan",
            cookImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QfHXtZSr7Y9IoJWng-WknDoAHZxbxPC6QQ&usqp=CAU"
        },
        isPopular: 1,
        tags: [{ name: "chicken" ,Id:0 },{ name: "spicy" ,Id:1 },{ name: "spicy1" ,Id:2 }],
        price: 500,
        distance: 5,
        available: 3
    }
]
export default function PostCardRoot() {
    const [postList,setPostList]=useState([])
    useEffect(()=>{
        fetch('https://oregano-api.herokuapp.com/graphql',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query:`query{
                    getPosts {
                        itemName
                        images
                        owner{
                          facebookToken
                          id
                        }
                        id
                        amountProduced
                        unitPrice
                        isPopular
                        tags
                      } 
                }`
            })
        }).then(res=>res.json())
        .then(data=>{
            let actualData=data.data.getPosts
           for(let n =0;n<actualData.length;n++){
                actualData[n].tags = (JSON.parse (actualData[n].tags) )
                actualData[n].images=(JSON.parse (actualData[n].images) )
                actualData[n].owner.facebookToken=(JSON.parse (actualData[n].owner.facebookToken) )
           }
           console.log(actualData)
             setPostList(actualData)
        })
    },[])
    function renderCard(post){
        return <PostCard post={post } />
    }
    return (
        <View>
            <FlatList 
                horizontal={true}
                data={postList} 
                keyExtractor={post=>post.id}
                renderItem={ renderCard}
            />  
             
        </View>
    );
}

