import React, { useEffect, useState, useContext} from 'react';
import { View ,Text, StyleSheet,Image,FlatList, ScrollView, Dimensions} from 'react-native';
 import Globals from '../Globals';
 import { useIsFocused } from '@react-navigation/native';
 import { EvilIcons } from '@expo/vector-icons';
 import { FontAwesome } from '@expo/vector-icons';
 import Tags from '../shared/Tags';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomSheet } from 'react-native-btr';
import AddTocart from '../shared/AddTocart';
import CartServices from '../../services/CartServices';

import {RootContext} from '../contexts/GlobalContext'


  function PostDetails(props) {
      const isFocused=useIsFocused()
    const rootContext=useContext(RootContext)
    const  postId =props.route.params.postId
    const [post,setCurrentPost]=useState(null)
    const [canShowModal, toggleModal]=useState(false)
    const [cartInfo,setCartInfo]=useState(null)
    const [isAddedToCart,setCartStatus]=useState(false)
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        toggleModal(!canShowModal);
    }
    function addToCart(){
        setCartStatus(true)
        updateCartInfo()
    }
    function removeFromCart(){
        setCartStatus(false)
        updateCartInfo()
    }
    function updateCartInfo(){
        CartServices.getCartList().then(carts=>{
            console.log(carts,props.route.params.postId)
            try {
                if(!carts.length)setCartStatus(false)
                for(let n=0;n<carts.length;n++){
                     
                    if(carts[n]['id'] ==props.route.params.postId ){
                        setCartStatus(true)
                        console.log(carts[n])
                        setCartInfo(carts[n])
                        break
                    }
                }
            } catch (error) {
                setCartStatus(false)
            }
              
            
        })
    }
    useEffect(()=>{
        rootContext.updateContext({...rootContext.contextObject, headerString:props.route.params.headerString})
        Globals.getPostInfo(postId)
            .then(postInfo=>{
                setCurrentPost(postInfo)
                updateCartInfo()
            })
    },[isFocused ])
    return (
        <View style={{
           height:Dimensions.get('window').height,
           flex:1
       }}>
            {post &&  <View style={{
                flex:1
            }}>
           <ScrollView style={{
                padding:20,
                margin:10,
                backgroundColor:"white",
                borderRadius:10
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
                       }}> {post.itemName} 
                   </Text>
                    
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
                       <Text onPress={()=>{
                           CartServices.clearAll()
                       }} style={{
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
           
           <View style={[styles.tags, styles.marginVertical,{
                   padding:5
               }]}>
                   <Text style={styles.tagIcon}>🏷️</Text> 
                       
                   { post.tags.map((tag,index)=>(
                       <Tags key={index} name={tag } />
                   )) }
               </View>
           </ScrollView>
           
                {!isAddedToCart && <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>{
                            toggleBottomNavigationView()
                            
                        }}>
                   <Text style={{
                       fontSize:20
                   }}> Add to cart </Text>

                    </TouchableOpacity>
                   
               </View>}
               {isAddedToCart && <View style={styles.footer2}>
                        <View style={{
                            padding:5,
                            borderRadius:5,
                            backgroundColor:"#c4c4c4"
                        }}>
                            <FontAwesome onPress={()=>{
                                CartServices.removeItem(post.id)
                                setCartStatus(false)
                            }} name="trash-o" size={30} color="black" />
                        </View>
                        <View style={styles.alighnHorizontal}>
                                <TouchableOpacity onPress={()=>{
                                    console.log(4)
                                }} >
                                    <View style={styles.updateAmountBtn}> 
                                        <Text style={{
                                            fontSize:20
                                        }}>+</Text> 
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.updateAmountBtn,{
                                    backgroundColor:"#C4C4C4"
                                }]}> 
                                    <Text style={{
                                        fontSize:20
                                    }}>{cartInfo?.amount}</Text> 
                                </View>
                                <TouchableOpacity >
                                    <View style={styles.updateAmountBtn}> 
                                        <Text style={{
                                            fontSize:20
                                        }}>-</Text> 
                                    </View>
                                </TouchableOpacity>
                        </View>
                    </View>}
                
           <BottomSheet
               visible={canShowModal}
               onBackButtonPress={toggleBottomNavigationView}
               onBackdropPress={toggleBottomNavigationView}
               >
               <View style={styles.bottomNavigationView}>
                   <AddTocart togglePopup={toggleBottomNavigationView} addToCart={addToCart} post={post} />
               </View>
           </BottomSheet>
           </View>
        }
        </View>
    );
}
const styles=StyleSheet.create({
    container:{},
    heading:{},
    
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: Dimensions.get('window').height*0.65,
    borderRadius:10
  },
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
	footer:{
		backgroundColor:"#FFA500",
		height:60,
		justifyContent:"center",
		alignItems:"center"
	},
    footer2:{
        backgroundColor:"#ffffff",
		height:60,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        padding:10
    },
    updateAmountBtn:{
        backgroundColor:"#FA01FF",
        height:40,
        aspectRatio:1,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    alighnHorizontal:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"white",
        borderRadius:10,
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center"
    }
})
export default PostDetails;