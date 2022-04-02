import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PostService from '../../../services/PostService';
import { RootContext } from '../../contexts/GlobalContext';
function OrderHistory(props) {
    const isFocused = useIsFocused()
    const { contextObject, updateContext } = React.useContext(RootContext)
    React.useEffect(() => {
        PostService
    }, [isFocused])
    return (
        <View></View>
    );
}

export default OrderHistory;