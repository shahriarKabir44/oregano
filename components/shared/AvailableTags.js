import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Global from '../../services/Globals';


function AvailableTags(props) {
    const [availableTags, setAvailableTags] = React.useState(["Loading.."])
    React.useEffect(() => {
        fetch(Global.searchServerURL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getLocalAvailableItems 
                  }`
            })

        })
            .then(response => response.json())
            .then(({ data }) => {
                setAvailableTags(data.getLocalAvailableItems);

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
                    width: '30%',
                    margin: 5,

                }} key={index} onPress={() => {
                    props.tabNav.navigate('Search items', {
                        query: item
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