import { authService } from "firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "components/AuthForm.css";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        // event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            let errormsg;
            if (error.code == 'auth/weak-password') {
                errormsg = "Password should be at least 6 characters";
            }
            if (error.code == 'auth/email-already-in-use') {
                errormsg = "Email is already in use";
            }
            if (error.code == 'auth/invalid-email') {
                errormsg = "Invalid Email";
            }
            if (error.code == 'auth/wrong-password') {
                errormsg = "Wrong password";
            }
            if (error.code == 'auth/user-not-found') {
                errormsg = "User not found";
            } else {
                setError(error.message);
            }
            setError(errormsg);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
        
            
            <Form onFinish={onSubmit}>
            
            <div>
                    <div>
                    <Input size="large" prefix={<UserOutlined />} name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="input" />
                    </div>
                    <br />
                    <div>
                    <Input size="large" prefix={<LockOutlined />} name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="input" />
                    </div>
                    <br />
                    <Button size="large" type="primary" block htmlType="submit" >{newAccount ? "Create Account" : "Log In"}</Button>
                    <br />
                    <br />
                    {error && <span className="autherror"><ExclamationCircleOutlined /> {error}</span>}
                    
                    </div>
            
            </Form>
            <span onClick={toggleAccount} className="togglebtn">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            
            
        </>
    )
};

export default AuthForm;