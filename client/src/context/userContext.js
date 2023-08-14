import { useState, createContext } from "react";

export const userContext = createContext()

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({})
    const uuid = window.localStorage.getItem('uuid')
    
    return (
        <userContext.Provider value={{
            loggedInUser,
            setLoggedInUser
            // uuid
        }}>

            {props.children}
        </userContext.Provider>
    )
}
