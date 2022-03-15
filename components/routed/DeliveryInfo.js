import React from 'react';
import { View, Text, Button } from 'react-native';
import LocationView from '../shared/LocationView';

function DeliveryInfo(props) {
    console.log(props.route.params)
    const [mapVisibility, setMapVisibility] = React.useState(false)
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
            <Button title='Pickup location' onPress={() => {
                setMapVisibility(true)
            }} />
            <LocationView tagnameLabel={"Pickup location"} mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={{
                latitude: 22.8022,
                longitude: 89.5339
            }} />

            <Button title='Drop location' onPress={() => {
                setMapVisibility(true)
            }} />
            <LocationView tagnameLabel={"Pickup location"} mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={{
                latitude: 22.8022,
                longitude: 89.5339
            }} />
        </View>
    );
}

export default DeliveryInfo;