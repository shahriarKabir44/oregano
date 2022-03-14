import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, Button, Dimensions, Modal } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { TouchableOpacity } from 'react-native';

import * as Location from 'expo-location';
import openMap from 'react-native-open-maps';
function LocationView({ mapVisibility, setMapVisibility, target, tagnameLabel }) {
    return (
        <BottomSheet
            visible={mapVisibility}
            onBackButtonPress={() => {
                setMapVisibility(false)
            }}
            onBackdropPress={() => {
                setMapVisibility(false)
            }}
        >

            <View style={{
                backgroundColor: '#fff',
                width: '100%',
                height: Dimensions.get('window').height * 0.65,
                borderRadius: 10
            }}>
                <View style={{
                    display: "flex",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 1000,

                }}>
                    <TouchableOpacity onPress={() => {

                        openMap({
                            start: "1981 Landings Dr, Mountain View, CA 94043, USA",
                            end: "1000 N Rengstorff Ave, Mountain View, CA 94043, USA",
                            navigate: true

                        })
                    }} style={{

                        padding: 20,
                        backgroundColor: "#c4c4c4",

                    }}>
                        <Text>Expand</Text>
                    </TouchableOpacity>
                </View>
                <MapView region={{
                    latitude: target.latitude,
                    longitude: target.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }} style={{
                    flex: 1,
                    overflow: "hidden"
                }} >

                    <Marker coordinate={{
                        latitude: target.latitude,
                        longitude: target.longitude,
                        atitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }} title={tagnameLabel} />
                </MapView>
            </View>
        </BottomSheet>
    );
}

export default LocationView;