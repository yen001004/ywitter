import { dbService } from "firebaseConfig";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
    const [yweet, setYweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "yweets"), {
                yweet,
                createdAt: Date.now(),
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
        </div>
    );
};
export default Home;