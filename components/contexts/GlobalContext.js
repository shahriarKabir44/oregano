import React, { useState } from 'react';
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
    }
]
users[0].facebookToken
export default function GlobalContext({ children }) {
    const [globalObject, setGlobalObject] = useState({
        headerString: "",
        tagList: [],
        currentUser: users[1]
    })
    return (
        <RootContext.Provider value={{
            contextObject: globalObject,
            updateContext: setGlobalObject
        }}>
            {children}
        </RootContext.Provider>
    );
}

