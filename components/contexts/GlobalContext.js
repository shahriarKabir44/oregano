import React, { useState } from 'react';
export const RootContext = React.createContext()
export default function GlobalContext({ children }) {
    const [globalObject, setGlobalObject] = useState({
        headerString: "",
        tagList: [],
        currentUser: {
            "facebookToken": JSON.parse("{\"name\":\"Nusrat jahan\",\"profileImageURL\":\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN_wHjuRlqs0B2niLg6q092Lyrjbuv6MPHRg&usqp=CAU\",\"coverPhotoURL\":\"https://cdnimg.webstaurantstore.com/images/articles/359/blog-chefs-header.jpg\",\"email\":\"nusrat@gmail.com\",\"phone\":\"01234567891\",\"address\":\"Nirala, Khulna\"}"),
            "id": "6233763287e53dc7547b702c",
            "rating": 3.5,
            "currentCity": "Nirala, Khulna",
            "currentLatitude": 22.803272881875372,
            "currentLongitude": 89.5545602022129
        }
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

