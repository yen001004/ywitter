import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { authService, dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Yweet from "components/Yweet";

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
        <>
        <div>
            {
                nameUpdating ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                            <input type="submit" value="Update Profile" />
                        </form>
                        <button onClick={toggleNameUpdating}>Cancel</button>
                    </>
                ) : (
                    <button onClick={toggleNameUpdating}>Update Profile</button>
                )
            }
        </div>
            
            <button onClick={onLogOutClick}>Log Out</button>
            <div>
                {myYweets.map((yweet) => (
                    <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    )
};