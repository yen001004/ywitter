import React, { useState } from "react";
import { dbService } from "firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Yweet = ({ yweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newYweet, setNewYweet] = useState(yweetObj.text);
    const YweetTextRef = doc(dbService, "yweets", `${yweetObj.id}`);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this yweet?");
        if (ok) {
            await deleteDoc(YweetTextRef);
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(YweetTextRef, {
            text: newYweet
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewYweet(value);
    };
    return (
        <div>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input type="text" placeholder="Edit your yweet" value={newYweet} required onChange={onChange}/>
                            <input type="submit" value="Update Yweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                 ) : (
                     <>
                        <h4>{yweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Yweet</button>
                                <button onClick={toggleEditing}>Edit Yweet</button>
                            </>
                        )}
                     </>
                 )
            }
        </div>
    );
};

export default Yweet;