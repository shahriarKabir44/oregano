import React from 'react';
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
    function renderCard(post){
        return <PostCard post={post } />
    }
    return (
        <View>
           <FlatList 
                horizontal={true}
                data={posts} 
                keyExtractor={post=>post.Id}
                renderItem={ renderCard}
            />
        </View>
    );
}

