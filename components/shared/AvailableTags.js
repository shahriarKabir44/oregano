import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


function AvailableTags({ navigator }) {
    const [availableTags, setAvailableTags] = React.useState(["Loading.."])
    React.useEffect(() => {
        fetch('http://192.168.43.90:3000/getAvailableTags')
            .then(response => response.json())
            .then(({ data }) => {
                setAvailableTags(data);

            })
    }, [])




    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
        }}>
            {availableTags.map((item, index) => {
                return (<TouchableOpacity style={{
                    backgroundColor: "#4da5ffe0",
                    padding: 10,
                    borderRadius: 5,
                    width: '45%',
                    margin: 5,

                }} key={index} onPress={() => {
                    navigator.push('searchResult', {
                        tag: item
                    })
                }}>
                    <Text style={{
                        textAlign: "center",
                        fontSize: 15,
                        color: "white"
                    }}>{item}</Text>
                </TouchableOpacity>)
            })}
        </View>

    );
}

export default AvailableTags;