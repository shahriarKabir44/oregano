import React, { useState } from 'react';
import Global from '../../services/Globals';
import LocationService from '../../services/LocationService';
export const RootContext = React.createContext()
import LocalStorageService from '../../services/LocalStorageService'
let users = [
    {
        id: ("62aca83c670426ea47bbc747"),
        facebookToken: {
            name: "Shahriar Kabir",
            profileImageURL: "https://www.taxadvisermagazine.com/sites/default/files/styles/article_full/public/employee-Deepak%20Sethi.jpg?itok=ZKrPSHWR&c=957d9622c9a1717ee19018eff40a9919",
            coverPhotoURL: "https://www.glassdoor.com/employers/app/uploads/sites/2/2018/09/resources-benefits-employees-want-most-min-768x483-1-e1540508225245.jpg",
            email: "shahriar@gmail.com",
            phone: "017123432784"
        },
        phone: '017123432784',
        currentLatitude: 37.413200093902745,
        currentLongitude: -122.0894346133671,
        isRider: 0,
        rating: 4.4,
        currentCity: '716 Sierra Vista Ave',
    },
    {
        "facebookToken": JSON.parse("{\"name\":\"Nusrat jahan\",\"profileImageURL\":\"https://imageio.forbes.com/specials-images/imageserve/6109550f1aa8564670194ad4/Close-up-smiling-businesswoman-holding-computer-tablet--looking-to-side/960x0.jpg?fit=bounds&format=jpg&width=960\",\"coverPhotoURL\":\"https://cdnimg.webstaurantstore.com/images/articles/359/blog-chefs-header.jpg\",\"email\":\"nusrat@gmail.com\",\"phone\":\"01234567891\",\"address\":\"Nirala, Khulna\"}"),
        "id": "6233763287e53dc7547b702c",
        "rating": 3.5,
        "currentCity": "2425 Garcia Ave, Mountain View",
        "currentLatitude": 22.803272881875372,
        "currentLongitude": 89.5545602022129
    },
    {
        "id": "62337746e01e7759847f1d8d",
        "facebookToken": {
            name: 'Musfiq Rahman',
            profileImageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPqv9XyrSDyn0GcBiCmKj7WzhH_nzgDJ-tw&usqp=CAU',
            coverPhotoURL: 'https://image.shutterstock.com/image-photo/chef-hands-keep-wok-fire-260nw-1758966962.jpg',
            email: 'musfiq@gmail.com',
            phone: '01712345623'
        },
        "phone": "01712345623",
        "currentLatitude": 37.423596213254115,
        "currentLongitude": -122.09753731238035,
        "isRider": 1,
        "rating": 2.5,
        "currentCity": "2470 Charleston Rd"
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

    function setCurrentUser(user) {
        LocalStorageService.store('currentUser', user)
            .then(() => {
                setGlobalObject({ ...globalObject, currentUser: user })

            })
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
        let geocodeData = await LocationService.getLocationGeocode(locationInfo.coords)
        let geocode = {}
        if (geocodeData.length) {
            geocode = { ...geocodeData[0] }
        }
        let locationData = {
            ...locationInfo,
            currentLocationGeoCode: geocode,
            region: geocode.region
        }

        setGlobalObject({ ...globalObject, currentLocation: locationData })
        await fetch(Global.SERVER_URL + '/updateUserLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                region: locationData.region,
                locationInfo: JSON.stringify(locationData.currentLocationGeoCode),
                userId: globalObject.currentUser.id,
                currentLatitude: locationData.coords.latitude,
                currentLongitude: locationData.coords.longitude
            })
        }).then(res => res.json())

        return locationData.currentLocationGeoCode


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

