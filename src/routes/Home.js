import React, { useEffect, useState } from "react";
import { dbService } from "firebaseConfig";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";


const Home = ({ userObj }) => {
    const [yweet, setYweet] = useState("");
    const [yweets, setYweets] = useState([]);
    
    useEffect(() => {
        const q = query(collection(dbService, "yweets"));
        onSnapshot(q, snapshot => {
            const yweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setYweets(yweetArr);
        });
    }, []);
    
    const onSubmit = async (event) => {
        event.preventDefault();
            await addDoc(collection(dbService, "yweets"), {
                text: yweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            // console.log("Document written with ID: ", docRef.id);
        
        setYweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setYweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={yweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Yweet" />
            </form>
            <div>
                {yweets.map((yweet) => (
                    <div key={yweet.id}>
                        <h4>{yweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;