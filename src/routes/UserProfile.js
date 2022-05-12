import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { authService, dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Yweet from "components/Yweet";
import "routes/UserProfile.css"

export default ({ userObj }) => {
    let params = useParams();
    const [userName, setUserName] = useState("");
    const [userYweets, setUserYweets] = useState([]);
    const getUserYweets = async() => {
        const q = query(collection(dbService, "yweets"), where("creatorId", "==", params.id), orderBy("createdAt", "desc"));
        onSnapshot(q, snapshot => {
            console.log()
            const userYweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                
            }));
            setUserYweets(userYweetArr);
            setUserName(userYweetArr[0].creatorName);
        });
        
    };
    useEffect(() => {
        getUserYweets();
    }, [])


    return (
        <div className="userMain">
        <h3>{userName}'s Home</h3>
        <div className="cardgrid">
                {userYweets.map((yweet) => (
                    <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
};