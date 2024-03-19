/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getInfoUser } = useUser(navigate);
  const [info, setInfo] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const id_user = window.localStorage.getItem("id_user");
    getInfoUser(id_user, (err, data) => {
      if (err) {
        return setInfo([err]);
      }
      dispatch(setUser(data.data.user));
    });
    /* } */
  }, [reload]);

  return (
    <>
      <UserContext.Provider
        value={{
          info,
          reload,
          setInfo,
          setReload,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
}
