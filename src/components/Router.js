import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/MyProfile";
import UserProfile from "routes/UserProfile";

const AppRouter = ({refreshUser, isLoggedIn, userObj }) => {
    
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                <>
                    <Route exact path="/" element={<Home userObj={userObj} />}>
                    </Route>
                    <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}>
                    </Route>
                    <Route exact path="/profile/:id" element={<UserProfile  />}>
                    </Route>
                </> 
                ) : (
                <Route exact path="/" element={<Auth />}>
                </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;