import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseConfig";
import { updateProfile } from "firebase/auth";
import "antd/dist/antd.css"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.displayName,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        });
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.displayName,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
    });
  }
  return (
    <>
      {init ? (
        <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
         "Initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Ywitter</footer> */}
    </>
  );
}

export default App;
