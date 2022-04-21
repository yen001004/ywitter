import React, { useEffect, useState } from "react";
import { dbService, storageService } from "firebaseConfig";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import Yweet from "components/Yweet";
import { ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
    const [yweet, setYweet] = useState("");
    const [yweets, setYweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        // await addDoc(collection(dbService, "yweets"), {
        //     text: yweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        // setYweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setYweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={yweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Yweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {yweets.map((yweet) => (
                    <Yweet key={yweet.id} yweetObj={yweet} isOwner={yweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;