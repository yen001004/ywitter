import { authService, firebaseInstance } from "firebaseConfig";
import React, { useState } from "react";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "components/AuthForm";
import { Button, Card } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import "routes/Auth.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSplotch } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider = "";
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    }
    return (
        <div>
            <div className="card">
        <Card className="formcard">
        <FontAwesomeIcon icon={faSplotch} size="5x" className="icon"/>
            <AuthForm />
            
            <div>
            <br />
                <Button onClick={onSocialClick} name="google" className="socialbtn"><GoogleOutlined/>Continue with Google</Button>
                <Button onClick={onSocialClick} name="github" className="socialbtn"><GithubOutlined/>Continue with Github</Button>
            </div>
            </Card>
            </div>
        </div>
    );
};
export default Auth;