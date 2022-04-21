import React, { useEffect, useState } from "react";
import { dbService } from "firebaseConfig";
import { addDoc, collection, getDocs, query } from "firebase/firestore";


const Home = () => {
    const [yweet, setYweet] = useState("");
    const [yweets, setYweets] = useState([]);
    const getYweets = async () => {
        const q = query(collection(dbService, "yweets"));
        const querySnapshot = await getDocs(q);
        const yweetObj = querySnapshot.docs.map((doc) => (
            {
                ...doc.data(),
                id: doc.id,
            }
            
        ));
        setYweets(yweetObj);
    };
    useEffect(() => {
        getYweets();
    }, []);
    
    const onSubmit = async (event) => {
        event.preventDefault();
            await addDoc(collection(dbService, "yweets"), {
                yweet,
                createdAt: Date.now(),
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
    console.log(yweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={yweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Yweet" />
            </form>
            <div>
                {yweets.map((yweet) => (
                    <div key={yweet.id}>
                        <h4>{yweet.yweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;