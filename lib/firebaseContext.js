import nookies from "nookies";
import { auth } from "./firebase";
import { createContext, useState, useEffect, useContext } from "react";
// import firebaseAdmi

const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
const [userFb, setUserFb] = useState(null);

//   console.log(user);

  useEffect(() => {
    return auth.onIdTokenChanged(async(user) => {
      if (!user) {
        setUserFb(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUserFb(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log("refreshing token");

      const userCurrent = auth.currentUser;
      if (userCurrent) await userCurrent.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ userFb }}>{children}</AuthContext.Provider>
  );
}


export const useAuth = () => {
    return useContext(AuthContext);
  };