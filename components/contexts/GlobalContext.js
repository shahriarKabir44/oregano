import React,{useState} from 'react';
export const RootContext=React.createContext()
 export default function GlobalContext({children}) {
    const [globalObject,setGlobalObject]=useState({
        headerString:"",
        tagList:[],
        currentUser:{
            "facebookToken":{
                "name":"Fatima Khan",
                "profileImageURL":"https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE",
                coverPhotoURL:"https://checkpoint.cvcheck.com/wp-content/uploads/Improve-employee-engagement-with-digital-apps.jpg",
                email:"firoza@gmail.com",
                phone:"12345",
                address:"Nirala, Khulna"
            },
            "id":"621413a308220b000e005185",
            followers:5,
            rating:3.4,
            totalItemsDelivered:10,
            followers:10
        }
    })
    return (
        <RootContext.Provider value={{
            contextObject:globalObject,
            updateContext:setGlobalObject
        }}>
                {children}
         </RootContext.Provider>
    );
}

