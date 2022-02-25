import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import PostCard from './PostCard';
let postList=[
    {"itemName":"cake",
            "images": [
                "https://images-gmi-pmc.edge-generalmills.com/99d8ae9a-737f-491c-a7f7-34b014e5682c.jpg",
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900",
                "https://img.taste.com.au/hbNtzI2Q/taste/2021/08/clinkers-cake-173208-2.jpg"
            ],
            "owner":{
                "facebookToken":{
                    "name":"Fatima Khan",
                    "profileImageURL":"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE"
                },
                "id":"621413a308220b000e005185"
            },
            "id":"6214162873f6ff9efc53efd8",
            "amountProduced":1,
            "unitPrice":100,
            "tags":["cake","pastry"],
            "unitType":"Units"
        },{
            "itemName":"cake",
            "images": [
                "https://images-gmi-pmc.edge-generalmills.com/99d8ae9a-737f-491c-a7f7-34b014e5682c.jpg",
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
                "https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900",
                "https://img.taste.com.au/hbNtzI2Q/taste/2021/08/clinkers-cake-173208-2.jpg"
            ],
            "owner":{
                "facebookToken":{
                    "name":"Fatima Khan",
                    "profileImageURL":"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE"
                },
                "id":"621413a308220b000e005185"
            },
            "id":"6214162873f6ff9efc53efd7",
            "amountProduced":5,
            "unitPrice":100,
            "tags":["cake","pastry"],
            "unitType":"Kgs"

    },
    {
        "itemName":"cake",
        "images": [
            "https://images-gmi-pmc.edge-generalmills.com/99d8ae9a-737f-491c-a7f7-34b014e5682c.jpg",
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
            "https://static.toiimg.com/thumb/53096885.cms?width=1200&height=900",
            "https://img.taste.com.au/hbNtzI2Q/taste/2021/08/clinkers-cake-173208-2.jpg"
        ],
        "owner":{
            "facebookToken":{
                "name":"Firoza Rahman",
                "profileImageURL":"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE"
            },
            "id":"621413a3082b000e005185"
        },
        "id":"6214162873f6ff9efc53efd7",
        "amountProduced":5,
        "unitPrice":100,
        "tags":["cake","pastry"],
        "unitType":"Kgs"

}]
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
                data={postList} 
                keyExtractor={post=>post.id}
                renderItem={ renderCard}
            />  
             
        </View>
    );
}

