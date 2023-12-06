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
    /*     const data = window.localStorage.getItem("persist:wtff");
    if (!data) {
      getInfoUser(setInfo, undefined, (user) => {
        dispatch(setUser(user));
      });
      return;
    }
    const dd = JSON.parse(data);
    const user = JSON.parse(dd.user);

    if (Object.keys(user.userInfo).length === 0) { */
    getInfoUser(setInfo, undefined, (user) => {
      dispatch(setUser(user));
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
