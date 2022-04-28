import React, { useEffect, useState } from "react";
import { dbService, storageService } from "firebaseConfig";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Yweet from "components/Yweet";

import YweetFactory from "components/YweetFactory";

const Home = ({ userObj }) => {
    const [yweets, setYweets] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService, "yweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, snapshot => {
            const yweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setYweets(yweetArr);
        });
    }, []);
    
    return (
        <div>
            <YweetFactory userObj={userObj} />
            <div>
                {yweets.map((yweet) => (
                    <Yweet userObj={userObj} key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;