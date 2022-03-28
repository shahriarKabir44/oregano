import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tags from '../../shared/Tags';

function PostCardProfile({ post, drawerNav, stackNav }) {
    post = post.item
    return (
        <TouchableOpacity onPress={() => {
            stackNav.push('Post details', {
                postId: post.id,

            })
        }}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.cardImg} source={{

                        uri: post.images[0],
                        height: "100%"
                    }} />
                </View>
                <View style={[styles.itemName, styles.marginVertical]}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}>{post.itemName}</Text>
                </View>

                <View style={[styles.tags, styles.marginVertical, {
                    padding: 5,
                    flex: 1,

                }]}>


                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}>
                        <Text style={styles.tagIcon}>🏷️</Text>
                        {post.tags.map((tag, index) => (
                            <Tags key={index} name={tag} />
                        ))}
                    </View>
                </View>
                <View style={[styles.otherInfo, styles.marginVertical]}>
                    <Text> Tk.{post.unitPrice} </Text>
                    <Text> {post.amountProduced} pc(s) available </Text>
                </View>{/* */}
            </View>
        </TouchableOpacity>
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
        height: 350
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
        justifyContent: 'space-around',
        alignItems: "center",
        paddingTop: 2
    },
    cardImg: {
        backgroundColor: "green",
        height: 170
    },



    tagIcon: {
        padding: 0,
        fontSize: 30
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    additionalInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
});

export default PostCardProfile;