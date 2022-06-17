import React from 'react';
import CreatePostBottomSheet from '../shared/CreatePostBottomSheet'
import MarkAvailableItemsBottomSheet from '../shared/MarkAvailableItemsBottomSheet'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
function CreateItem(props) {
    const [createPostBottomSheetVisibility, popupCreatePostBottomSheet] = React.useState(false)
    const [showAvailableItemsBottomSheet, toggleAvailableItemsBottomSheet] = React.useState(false)

    return (
        <View>
            <CreatePostBottomSheet {...props} bottomSheetVisibility={createPostBottomSheetVisibility} popupBottomSheet={popupCreatePostBottomSheet} />
            <MarkAvailableItemsBottomSheet  {...props} bottomSheetVisibility={showAvailableItemsBottomSheet} popupBottomSheet={toggleAvailableItemsBottomSheet} />

            <Text>Here!</Text>
        </View>
    );
}

export default CreateItem;