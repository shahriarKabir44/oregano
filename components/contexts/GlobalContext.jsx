import React, { useState } from 'react';
import Global from '../../services/Globals';
import LocationService from '../../services/LocationService';
export const RootContext = React.createContext()
import LocalStorageService from '../../services/LocalStorageService'
let users = [
    {
        "id": "6233763287e53dc7547b702c",
        "__v": 0,
        "currentCity": "2425 Garcia Ave, Mountain View",
        "currentLatitude": 23.1513269,
        "currentLongitude": 89.2024836,
        "facebookToken": JSON.parse("{\"name\":\"Nusrat Jahan\",\"profileImageURL\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_wHjuRlqs0B2niLg6q092Lyrjbuv6MPHRg&usqp=CAU\",\"coverPhotoURL\":\"https://cdnimg.webstaurantstore.com/images/articles/359/blog-chefs-header.jpg\",\"email\":\"nusrat@gmail.com\",\"phone\":\"01234567891\",\"address\":\"Nirala, Khulna\"}"),
        "isRider": 0,
        "locationInfo": "{\"postalCode\":null,\"isoCountryCode\":\"BD\",\"subregion\":\"Jessore District\",\"district\":null,\"name\":\"Unnamed Road\",\"region\":\"Khulna Division\",\"city\":\"Jessore\",\"country\":\"Bangladesh\",\"street\":\"Unnamed Road\",\"timezone\":null}",
        "phone": "01934567891",
        "rating": 3.5,
        "expoPushToken": "ExponentPushToken[q6zBvsLlChPKMdBVZQRhEN]",
        "region": "Khulna Division",
        "name": "Nusrat Jahan"
    },
    {
        "id": "62337746e01e7759847f1d8d",
        "__v": 0,
        "currentCity": "2470 Charleston Rd",
        "currentLatitude": 23.1513397,
        "currentLongitude": 89.2024746,
        "facebookToken": JSON.parse("{\"name\":\"Musfiq Rahman\",\"profileImageURL\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPqv9XyrSDyn0GcBiCmKj7WzhH_nzgDJ-tw&usqp=CAU\",\"coverPhotoURL\":\"http://192.168.43.90:3000/userImages/62337746e01e7759847f1d8d/62337746e01e7759847f1d8dcoverPhoto1655549251555.jpg\",\"email\":\"drew@gmail.com\",\"phone\":\"01712345623\"}"),
        "isRider": 1,
        "locationInfo": "{\"postalCode\":null,\"isoCountryCode\":\"BD\",\"subregion\":\"Jessore District\",\"district\":null,\"name\":\"Unnamed Road\",\"region\":\"Khulna Division\",\"city\":\"Jessore\",\"country\":\"Bangladesh\",\"street\":\"Unnamed Road\",\"timezone\":null}",
        "phone": "01712345623",
        "rating": 2.5,
        "expoPushToken": "ExponentPushToken[q6zBvsLlChPKMdBVZQRhEN]",
        "region": "Khulna Division",
        "name": "Musfiq Rahman"
    },
    {
        "id": "6233777c0d381190fab490d9",
        "__v": 0,
        "currentCity": "2014 Colony St",
        "currentLatitude": 37.41624375174636,
        "currentLongitude": -122.09178197457045,
        "facebookToken": JSON.parse("{\"name\":\"Tarif Hasan\",\"profileImageURL\":\"https://www.patriotsoftware.com/wp-content/uploads/2019/04/examples-requirements-statutory-employees.jpg\",\"coverPhotoURL\":\"https://image.shutterstock.com/image-photo/chef-hands-keep-wok-fire-260nw-1758966962.jpg\",\"email\":\"mitch@gmail.com\",\"phone\":\"01811234543\"}"),
        "isRider": 1,
        "locationInfo": "{\"0\":{\"postalCode\":null,\"isoCountryCode\":\"BD\",\"subregion\":\"খুলনা জেলা\",\"district\":\"Krishna Nagar\",\"name\":\"খুলনা জেলা\",\"region\":\"খুলনা বিভাগ\",\"city\":\"খুলনা\",\"country\":\"Bangladesh\",\"street\":null,\"timezone\":null}}",
        "phone": "01811234543",
        "rating": 0,
        "expoPushToken": "ExponentPushToken[Cdr8LpDjQtHUUI1Ri-85P7]",
        "region": "Khulna Division",
        "name": "Tarif Hasan"
    },
    {
        "id": "62aca83c670426ea47bbc747",
        "facebookToken": JSON.parse("{\"name\":\"Shahriar Kabir\",\"profileImageURL\":\"https://graph.facebook.com/651644265934358/picture?type=large\",\"coverPhotoURL\":\"abcd\"}"),
        "phone": "01631560063",
        "isRider": 0,
        "name": "Shahriar Kabir",
        "facebookId": 651644265934358,
        "__v": 0,
        "currentLatitude": 23.1513247,
        "currentLongitude": 89.2024816,
        "locationInfo": "{\"postalCode\":null,\"isoCountryCode\":\"BD\",\"subregion\":\"Jessore District\",\"district\":null,\"name\":\"Unnamed Road\",\"region\":\"Khulna Division\",\"city\":\"Jessore\",\"country\":\"Bangladesh\",\"street\":\"Unnamed Road\",\"timezone\":null}",
        "region": "Khulna Division",
        "expoPushToken": "ExponentPushToken[q6zBvsLlChPKMdBVZQRhEN]"
    }
]

export default function GlobalContext({ children }) {
    React.useEffect(() => {
        (isLoggedIn()).then(status => {
            if (status) {
                LocalStorageService.get('currentUser')
                    .then(data => {
                        //   setCurrentUser(data)
                        setCurrentUser(users[1])
                    })
            }
            // LocalStorageService.clearAll()
        })


    }, [])
    function getCurrentLocationGeocode() {
        return globalObject.currentLocation.currentLocationGeoCode
    }
    const [globalObject, setGlobalObject] = useState({
        isLoggedIn: false,
        headerString: "",
        tagList: [],
        currentUser: null,
        currentLocation: {
            coords: {
                latitude: 0,
                longitude: 0
            },
            currentLocationGeoCode: {

            }
        },
        expoPushToken: ""
    })

    async function setCurrentUser(user) {
        // await LocalStorageService.store('currentUser', user)
        setGlobalObject({ ...globalObject, currentUser: user })
        return user


    }

    function updatePushToken(token) {
        fetch(Global.SERVER_URL + '/updatePushToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                userId: globalObject.currentUser.id
            })
        })
    }
    function setHeaderString(title) {
        setGlobalObject({ ...globalObject, headerString: title })
    }
    async function isLoggedIn() {
        let status = await LocalStorageService.get('isLoggedIn');

        status != null ? setGlobalObject({ ...globalObject, isLoggedIn: true }) : setGlobalObject({ ...globalObject, isLoggedIn: false })
        return status != null// status != null
    }
    async function setLoginStatus(status) {
        await LocalStorageService.store('isLoggedIn', status)
        setGlobalObject({ ...globalObject, isLoggedIn: status })
    }
    async function updateCurrentLocationInfo() {
        let locationInfo = await LocationService.getCurrentLocation()
            .then(coords => {
                let locationInfo = {
                    coords: {
                        ...coords
                    }
                }
                return locationInfo
            })

        let geoApifyLocationData = await LocationService.getGeoApifyLocationInfo(locationInfo.coords)
        let locationData = {
            ...locationInfo,

            city: geoApifyLocationData.city,
            currentLocationName: geoApifyLocationData.geocode
        }
        setGlobalObject({ ...globalObject, currentLocation: locationData })
        await fetch(Global.SERVER_URL + '/user/updateUserLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                region: locationData.city,
                userId: globalObject.currentUser.id,
                currentLatitude: locationData.coords.latitude,
                currentLongitude: locationData.coords.longitude,
                currentLocationName: geoApifyLocationData.geocode
            })
        }).then(res => res.json())

        return locationData


    }
    return (
        <RootContext.Provider value={{
            contextObject: globalObject,
            updateContext: setGlobalObject,
            updateCurrentLocationInfo: updateCurrentLocationInfo,
            setHeaderString: setHeaderString,
            updatePushToken: updatePushToken,
            setCurrentUser: setCurrentUser,
            setLoginStatus: setLoginStatus,
            isLoggedIn: isLoggedIn,
            getCurrentLocationGeocode: getCurrentLocationGeocode,
            getCurrentLocationName: LocationService.getCurrentLocationName(),
            getCurrentUser: () => {
                return globalObject.currentUser
            }
        }}>
            {children}
        </RootContext.Provider>
    );
}

