import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
    const [errors, setErrors] = useState([]);

    return (
        <>
            <UserContext.Provider value={{ errors, setErrors }}>
                {props.children}
            </UserContext.Provider>
        </>
    );
}
