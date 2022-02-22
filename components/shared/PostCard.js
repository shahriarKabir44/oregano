import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native';
import Tags from './Tags';

function PostCard({post}) {
    post=post.item
    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.cardImg} source={{

                    uri: post.images[0],
                    height: "100%"
                }} />
            </View>
            <View style={[styles.itemName, styles.marginVertical]}> 
                <Text>{post.itemName}</Text> 
            </View>
             <View style={[styles.additionalInfo, styles.marginVertical]}>
                <View style={[styles.cookInfo, styles.marginVertical]}>
                    <View>
                        <Image style={styles.cookImg} source={{
                            height: "100%",
                            uri: post.owner.facebookToken.profileImageURL
                        }} />
                    </View>
                    <View style={styles.cookName}> 
                        <Text> {post.owner.facebookToken.name} </Text> 
                    </View>
                </View>
                {post.isPopular==1 && <View style={styles.popular}> 
                    <Text style={{
                        marginTop: 2
                    }} >🔥Popular</Text> 
                </View> }
                
            </View>
            <View style={[styles.tags, styles.marginVertical,{
                padding:5
            }]}>
                   <Text style={styles.tagIcon}>🏷️</Text> 
                    
                   { post.tags.map((tag,index)=>(
                       <Tags key={index} name={tag } />
                   )) }
            </View>
            <View style={[styles.otherInfo, styles.marginVertical]}>
                <Text> Tk 500 </Text>
                <Text> 5kms </Text>
                <Text> 4pc(s) available </Text>
            </View>{/* */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 250,
        borderColor: "black",
        margin: 2,
        borderWidth: 2,
        borderRadius: 15,
        overflow: "hidden",
        height: 425
    },
    itemName: {
        fontFamily: "sans-serif",
        marginLeft: 5,
        marginRight: 5,

    },
    marginVertical: {
        marginTop: 5,
        marginBottom: 5
    },
    otherInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position:"absolute",
        bottom:5,
        alignItems:"center",
    
    },
    cardImg: {
        backgroundColor: "green",
        height: 170
    },
    cookInfo: {
        textAlignVertical: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    popular: {

        backgroundColor: "#FCEEC7",
        borderRadius: 30,
        height: 30,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 15
    },
    cookName: {
        paddingTop: 15
    },
    cookImg: {
        backgroundColor: "red",
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        height:50
    },
    tagIcon: {
        padding: 0,
        fontSize:30
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap:"wrap"
    },
    additionalInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});

export default PostCard;