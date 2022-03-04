import React,{useState} from 'react';
export const RootContext=React.createContext()
 export default function GlobalContext({children}) {
    const [globalObject,setGlobalObject]=useState({
        headerString:"",
        tagList:[]
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

