import React from 'react';
import { View ,Text, StyleSheet,Image,FlatList} from 'react-native';
 import navigationObjects from './Globals';
 import { EvilIcons } from '@expo/vector-icons';
 import Tags from './shared/Tags';
function PostDetails(props) {
    const  post =props.route.params.post
      console.log(post)
    return (
        <View style={{
            padding:20
        }}>
            <View style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-around"
            }}>
                <Image style={{
                    width:130,
                    aspectRatio:1,
                    borderRadius:80
                }} source={{
                    uri:post.images[0]
                }} />
                <View style={styles.primaryInfo}>
                    <Text style={{
                        fontSize:30,
                        fontWeight:"bold"
                    }}> {post.itemName} </Text>
                    <Text style={{
                        fontSize:20
                    }}> Prepared By: </Text>
                    <View style={styles.horizontal_vert_Align}>
                        <Image style={{
                            width:50,
                            aspectRatio:1,
                            borderRadius:50
                        }} source={{
                            uri:post.owner.facebookToken.profileImageURL
                        }} />
                        <Text style={{
                            fontSize:20,
                            fontWeight:"bold"
                        }}> {post.owner.facebookToken.name} </Text>
                    </View>
                </View>
            </View>
 				<Text style={{
					fontSize:20
				}}>Details: </Text>
				
			 
             <FlatList 
                horizontal={true}
                data={post.images} 
                keyExtractor={image=>image }
                renderItem={ (image)=>{
                      return <View style={{
                          padding:5
                      }}>
                          <Image source={{ uri: image.item }} style={{
                        width:200,
                        aspectRatio:1,
                        
                    }} />
                      </View>
                    
                }}
            /> 
            <View style={styles.horizontalAlign}>
                <Text style={styles.infoText}> Tk. {post.unitPrice} </Text>
				<Text style={styles.infoText}> {post.amountProduced} Unit(s) available </Text>
            </View> 
			<View style={styles.horizontalAlign}>
                <View style={{
					flex:1,
					alignItems:"center",
					flexDirection:'row',
				}} > 
					<Text><EvilIcons name="location" size={30} color="black" /> </Text>
					<Text style={styles.infoText}>3km</Text> 
				</View>
				<Text style={styles.infoText}> 3 Hours ago </Text>
				
            </View> 
			{post.isPopular==1 && <View style={styles.popular }> 
							<Text style={{
								marginTop: 2
							}} >🔥Popular</Text> 
						</View> }
			<View style={[styles.tags, styles.marginVertical,{
                    padding:5
                }]}>
                    <Text style={styles.tagIcon}>🏷️</Text> 
                        
                    { post.tags.map((tag,index)=>(
                        <Tags key={index} name={tag } />
                    )) }
                </View>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{},
    heading:{},
	horizontalAlign:{
		display:"flex",
		flexDirection:"row",
		justifyContent:"space-between"
	},
	infoText:{
		fontSize:20,
		fontStyle:"italic"
	},
	horizontal_vert_Align:{
		flex:1,
		alignItems:"center",
		justifyContent:"space-between",
		flexDirection:'row',
		 
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
    popular: {
        backgroundColor: "#FCEEC7",
        borderRadius: 30,
        height: 30,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 15,
		width:100
    },
})
export default PostDetails;