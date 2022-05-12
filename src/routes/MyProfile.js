import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { authService, dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Yweet from "components/Yweet";
import "routes/MyProfile.css"
import { Button, Form, Input } from "antd";

export default ({ refreshUser, userObj }) => {
    const navigate = useNavigate();
    const [nameUpdating, setNameUpdating] = useState(false);
    const [myYweets, setMyYweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate("/");
    };
    const getMyYweets = async() => {
        const q = query(collection(dbService, "yweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
        onSnapshot(q, snapshot => {
            const myYweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMyYweets(myYweetArr);
        });
        
    };
    useEffect(() => {
        getMyYweets();
    }, [])

    const toggleNameUpdating = () => setNameUpdating((prev) => !prev);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        };
        setNameUpdating(false);
    };
    return (
        <div className="myMain">
            <h3>My Home</h3>
        <div>
            {
                nameUpdating ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <Input size="large" onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                            <Input size="large" type="submit" value="Update Profile" />
                        </form>
                        <Button onClick={toggleNameUpdating}>Cancel</Button>
                    </>
                ) : (
                    <Button onClick={toggleNameUpdating}>Update Profile</Button>
                )
            }
            <Button onClick={onLogOutClick}>Log Out</Button>
        </div>
            
            
            <div>
                {myYweets.map((yweet) => (
                    <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
};