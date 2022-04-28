import { collection, getDocs, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { authService, dbService } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Yweet from "components/Yweet";

export default ({  }) => {
    let params = useParams();
    const [userYweets, setUserYweets] = useState([]);
    const getUserYweets = async() => {
        const q = query(collection(dbService, "yweets"), where("creatorId", "==", params.id), orderBy("createdAt", "desc"));
        onSnapshot(q, snapshot => {
            const userYweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                
            }));
            setUserYweets(userYweetArr);
            
        });
        
    };
    useEffect(() => {
        getUserYweets();
    }, [])


    return (
        <>
        <div>this is : {params.id}</div>
        <div>
                {userYweets.map((yweet) => (
                    <Yweet key={yweet.id} yweetObj={yweet} isOwner={false} />
                ))}
            </div>
        </>
    )
};