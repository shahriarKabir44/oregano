import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

function SearchResultItem(props) {
    return (
        <View>
            <Text> {props.item.itemName} </Text>
        </View>
    );
}

export default SearchResultItem;