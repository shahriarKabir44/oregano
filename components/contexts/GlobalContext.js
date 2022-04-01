import React, { useState } from 'react';
import LocationService from '../../services/LocationService';
export const RootContext = React.createContext()
let users = [
    {
        id: ("6236374dcf2e2a30d240b3c6"),
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
        "facebookToken": JSON.parse("{\"name\":\"Nusrat jahan\",\"profileImageURL\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_wHjuRlqs0B2niLg6q092Lyrjbuv6MPHRg&usqp=CAU\",\"coverPhotoURL\":\"https://cdnimg.webstaurantstore.com/images/articles/359/blog-chefs-header.jpg\",\"email\":\"nusrat@gmail.com\",\"phone\":\"01234567891\",\"address\":\"Nirala, Khulna\"}"),
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
            email: 'drew@gmail.com',
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
    const [globalObject, setGlobalObject] = useState({
        headerString: "",
        tagList: [],
        currentUser: users[2],
        currentLocation: {
            coords: {
                latitude: 0,
                longitude: 0
            },
            currentLocationGeoCode: {

            }
        }
    })
    function updateCurrentLocationInfo() {
        LocationService.getCurrentLocation()
            .then(coords => {
                let locationInfo = {
                    coords: {
                        ...coords
                    }
                }
                return locationInfo
            }).then(locationInfo => {
                LocationService.getLocationGeocode(locationInfo.coords)
                    .then(data => {
                        let geocode = {}
                        if (data.length) {
                            geocode = { ...data[0] }
                        }
                        locationInfo = {
                            ...locationInfo,
                            currentLocationGeoCode: geocode
                        }

                        setGlobalObject({ ...globalObject, currentLocation: locationInfo })
                        return geocode
                    })
                    .then(geocode => {
                        fetch('http://192.168.43.90:3000/updateUserLocation', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                locationInfo: JSON.stringify(geocode),
                                userId: globalObject.currentUser.id
                            })
                        }).then(data => {

                        })
                    })

            })
    }
    return (
        <RootContext.Provider value={{
            contextObject: globalObject,
            updateContext: setGlobalObject,
            updateCurrentLocationInfo: updateCurrentLocationInfo
        }}>
            {children}
        </RootContext.Provider>
    );
}

