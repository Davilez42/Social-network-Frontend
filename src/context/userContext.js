import { createContext, useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom'
export const UserContext = createContext();
const friends_test = [
    {
        "id_user": "1",
        "fullname": "John Doe",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "2",
        "fullname": "Jane Smith",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "3",
        "fullname": "Alex Johnson",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "4",
        "fullname": "Sarah Williams",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "5",
        "fullname": "Michael Brown",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "6",
        "fullname": "Emily Davis",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "7",
        "fullname": "David Miller",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "8",
        "fullname": "Olivia Wilson",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    },
    {
        "id_user": "9",
        "fullname": "James Taylor",
        "url_avatar": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x"
    }
]

export function UserContextProvider(props) {
    const navigate = useNavigate()
    const { getInfoUser } = useUser(navigate)

    const [info, setInfo] = useState(['ESTO ES UN MENSAJE DE PRUEBA']);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [fullname, setFullname] = useState("");
    const [date_born, setDate_born] = useState("");
    const [url_avatar, setUrlavatar] = useState("");
    const [user_bio, setUserBio] = useState("");
    const [numberFriends, setNumberFriends] = useState(0)
    const [numberPosts, setNumberPosts] = useState(0)
    const [friends, setFriends] = useState(friends_test)

    useEffect(() => {
        console.log('entra al context', window.sessionStorage.getItem('tkn'));
        getInfoUser(
            setInfo,
            setUsername,
            setDate_born,
            setFullname,
            setPhoneNumber,
            setUrlavatar,
            setEmail,
            setUserBio
        );
    }, []);

    return (
        <>
            <UserContext.Provider value={{
                info,
                username,
                user_bio,
                url_avatar,
                date_born,
                fullname,
                email,
                phone_number,
                numberFriends,
                numberPosts,
                friends,
                setInfo,
                setDate_born,
                setEmail,
                setFullname,
                setPhoneNumber,
                setUrlavatar,
                setUsername,
                setUserBio,

            }}>
                {props.children}
            </UserContext.Provider >
        </>
    );
}
