import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Tags({ name }) {
    console.log(name)
    return (
        <View style={styles.container} >
             <Text  > {name} </Text> 
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        borderColor: "#000000",
        borderRadius: 50,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin:2
    }
})
export default Tags;