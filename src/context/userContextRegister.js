import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [info, setInfo] = useState([]);

    return (
        <>
            <UserContext.Provider value={{ info, setInfo }}>
                {props.children}
            </UserContext.Provider>
        </>
    );
}
