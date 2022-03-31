import React from 'react';
import { RootContext } from '../contexts/GlobalContext'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
function AssignedDeliveries(props) {
    const { contextObject, updateContext } = React.useContext(RootContext)
    React.useEffect(() => {
        updateContext({ ...contextObject, headerString: "Assigned orders" })
    }, [])
    return (
        <View>

        </View>
    );
}

export default AssignedDeliveries;