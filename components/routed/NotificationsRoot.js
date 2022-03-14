import React from 'react';
import { View, ScrollView } from 'react-native';
import NotificationService from '../../services/NotificationServices';
import NotificationItem from './notificationsViewUtils/NotificationItem';
import { RootContext } from '../contexts/GlobalContext'
function NotificationsRoot(props) {
    let { updateContext, contextObject } = React.useContext(RootContext)

    const [notificationList, setNotificationList] = React.useState([])
    React.useEffect(() => {
        updateContext({ ...contextObject, headerString: "Notifications" })
        NotificationService.getNotifications(1)
            .then(data => {
                setNotificationList(data)
            })
    }, [])
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