import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootContext } from '../contexts/GlobalContext';
import { RadioButton, TextInput } from 'react-native-paper';

function RegisterRider(props) {
    const { contextObject, updateContext, setHeaderString } = React.useContext(RootContext)
    React.useEffect(() => {
        setHeaderString("Become a rider")
    }, [])
    const [isAccepted, setAcceptance] = React.useState(false)
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                flex: 1,
                margin: 10
            }}>
                <Text>Terms and Conditions</Text>
                <ScrollView style={{
                    margin: 10,
                    padding: 5,
                    borderWidth: 2,
                    borderColor: "black"
                }}>
                    <Text>The terms and conditions for becoming a rider is simple..</Text>
                </ScrollView>
            </View>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
            }}>
                <RadioButton

                    value={isAccepted}
                    status={isAccepted === true ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setAcceptance(!isAccepted);
                    }}
                />
                <Text style={{

                    flexWrap: "wrap"
                }}>I accept the terms and conditions</Text>
            </View>
        </View>
    );
}

export default RegisterRider;