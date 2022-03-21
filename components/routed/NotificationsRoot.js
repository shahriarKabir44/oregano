import React from 'react';
import { View, ScrollView } from 'react-native';
import NotificationService from '../../services/NotificationServices';
import NotificationItem from './notificationsViewUtils/NotificationItem';
import { RootContext } from '../contexts/GlobalContext'
import { useIsFocused } from '@react-navigation/native';
function NotificationsRoot(props) {
    const isFocused = useIsFocused()
    let { updateContext, contextObject } = React.useContext(RootContext)

    const [notificationList, setNotificationList] = React.useState([])


    React.useEffect(() => {
        if (isFocused) {
            updateContext({ ...contextObject, headerString: "Notifications" })
            NotificationService.getNotifications(contextObject.currentUser.id)
                .then(data => {
                    setNotificationList(data)
                })
        }

    }, [isFocused])
    return (
        <View style={{
            flex: 1,
            margin: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#ffffff"
        }}>
            <ScrollView>
                {notificationList.map((notification, index) => {
                    return <NotificationItem navigator={props.navigation} notificationItem={notification} key={index} />
                })}
            </ScrollView>
        </View>
    );
}

export default NotificationsRoot;