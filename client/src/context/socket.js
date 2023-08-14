import { useState, createContext } from "react";

export const socketContext = createContext()

export const SocketProvider = (props) => {
    const [usersInRoom, setUsersInRoom] = useState([])
    return (
        <socketContext.Provider value={{
            usersInRoom,
            setUsersInRoom
        }}>

            {props.children}
        </socketContext.Provider>
    )
}
