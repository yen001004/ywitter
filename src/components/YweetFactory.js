import { dbService, storageService } from "firebaseConfig";
import React, { useState } from "react";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import "components/YweetFactory.css"
import { Image, Input } from "antd";
import { CloudTwoTone } from "@ant-design/icons";

const YweetFactory = ({ userObj }) => {
    const [yweet, setYweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const yweetObj = {
            text: yweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            creatorName: userObj.displayName,
            attachmentUrl
        }
        await addDoc(collection(dbService, "yweets"), yweetObj);
        setYweet("");
        setAttachment("");
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
    const onClearAttachment = () => {setAttachment("")};
    return (
        <div className="yweetFactory">
        <form onSubmit={onSubmit}>
                <Input size="large" value={yweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} prefix={<CloudTwoTone />} />
                <Input type="file" accept="image/*" onChange={onFileChange} />
                <Input type="submit" value="Yweet" />
                {attachment && (
                    <div>
                        <Image src={attachment} width="150px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
        </div>
    )
};

export default YweetFactory;