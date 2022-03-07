import React from 'react';
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react';
import { RootContext } from '../../contexts/GlobalContext';
import { TextInput } from 'react-native-paper';
import PostService from '../../../services/PostService'
import { ScrollView } from 'react-native';
import SearchResultItem from './SearchResultItem';
function ResultsRoot(props) {
    const rootContext = React.useContext(RootContext)
    const [currentTagName, setTagName] = useState("")
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        rootContext.updateContext({ ...rootContext.contextObject, headerString: "Search result" })
        setTagName(props.route.params.tag)
        PostService.searchPost(props.route.params.tag)
            .then(data => {
                setSearchResult(data)
            })
    }, [])
    return (
        <View style={{
            flex: 1,
            margin: 10,
            padding: 5,
            backgroundColor: "white",
            borderRadius: 10

        }}>
            <View>
                <TextInput
                    label="Tag Name"
                    value={currentTagName}
                    onChangeText={text => setTagName(text)}
                />
                <Text style={{
                    fontSize: 20
                }}>Search results for {currentTagName} </Text>
            </View>
            <ScrollView style={{
                backgroundColor: "#c4c4c4"
            }}>
                {searchResult.map((item, index) => {
                    return <SearchResultItem navigation={props.navigation} key={index} item={item} />
                })}
            </ScrollView>
        </View>
    );
}

export default ResultsRoot;