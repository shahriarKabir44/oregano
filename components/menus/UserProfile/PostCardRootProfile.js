import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { FlatList } from 'react-native';
import PostCardProfile from './PostCardProfile';

export default function PostCardRootProfile(props) {
    function renderCard(post) {
        return <PostCardProfile {...props} post={post} />
    }
    return (
        <View>
            <FlatList
                horizontal={true}
                data={props.postList}
                keyExtractor={post => post.id}
                renderItem={renderCard}
            />

        </View>
    );
}

