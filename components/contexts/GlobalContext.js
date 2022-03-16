import React, { useState } from 'react';
export const RootContext = React.createContext()
export default function GlobalContext({ children }) {
    const [globalObject, setGlobalObject] = useState({
        headerString: "",
        tagList: [],
        currentUser: {
            "facebookToken": JSON.parse("{\"name\":\"Laura Wilson\",\"profileImageURL\":\"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE\",\"coverPhotoURL\":\"https://cdnimg.webstaurantstore.com/images/articles/359/blog-chefs-header.jpg\",\"email\":\"laura@gmail.com\",\"phone\":\"12345\",\"address\":\"Nirala, Khulna\"}"),
            "id": "62310ad1528bf9f5625f5fea",
            "rating": 3.5,
            "currentCity": "Nirala, Khulna",
            "currentLatitude": 12.33,
            "currentLongitude": 23.44
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

