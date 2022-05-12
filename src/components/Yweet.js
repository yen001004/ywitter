import React, { useState } from "react";
import { dbService, storageService } from "firebaseConfig";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";
import "components/Yweet.css"
import { Button, Card, Form, Image, Input } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const Yweet = ({ yweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newYweet, setNewYweet] = useState(yweetObj.text);
    const yweetTextRef = doc(dbService, "yweets", `${yweetObj.id}`);
    const yweetUrlRef = ref(storageService, yweetObj.attachmentUrl);
    
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this yweet?");
        if (ok) {
            await deleteDoc(yweetTextRef);
            if (yweetObj.attachmentUrl !== "") {
                await deleteObject(yweetUrlRef);
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(yweetTextRef, {
            text: newYweet,
            createdAt: Date.now()
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
        <div className="yweets">
            <Card>
            {
                editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <Input type="text" placeholder="Edit your yweet" value={newYweet} required onChange={onChange}/>
                            <Input type="submit" value="Update Yweet" />
                        </form>
                        <Button onClick={toggleEditing}>Cancel</Button>
                    </>
                 ) : (
                     <>
                        <h3><Link to={`/profile/`+yweetObj.creatorId}>{yweetObj.creatorName}</Link></h3>
                        <h5 className="yweetTime">{new Date(yweetObj.createdAt).toLocaleString()}</h5>
                        <h4>{yweetObj.text}</h4>
                        {yweetObj.attachmentUrl && <Image src={yweetObj.attachmentUrl} width="150px" />}
                        {isOwner && (
                            <>
                                <Button onClick={onDeleteClick}><DeleteTwoTone /></Button>
                                <Button onClick={toggleEditing}><EditTwoTone /></Button>
                            </>
                        )}
                     </>
                 )
            }
            </Card>
        </div>
    );
};

export default Yweet;