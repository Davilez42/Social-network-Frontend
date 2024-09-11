/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const { userId } = useSelector((state) => state.auth.userAuth);

  const dispatch = useDispatch();

  const { getInfoUser } = useUser();

  const [info, setInfo] = useState([]);
  const [backToInit, setBackToInit] = useState(false);

  useEffect(() => {
    getInfoUser(userId, (err, data) => {
      if (err) {
        return setInfo([err.message]);
      }
      dispatch(setUser(data.data.user));
    });
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          info,
          backToInit,
          setInfo,
          setBackToInit,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
}
