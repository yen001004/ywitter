import { authService } from "firebaseConfig";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
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
            setError(error.message);
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
                    <Input size="large" prefix={<LockOutlined />} name="password" type="password" placeholder="Password" required value={password}onChange={onChange} className="input" />
                    </div>
                    <br />
                    <Button size="large" type="primary" block htmlType="submit" >{newAccount ? "Create Account" : "Log In"}</Button>
                    <br />
                    <br />
                    {error}
                    </div>
            
            </Form>
            <span onClick={toggleAccount} className="togglebtn">
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            
            
        </>
    )
};

export default AuthForm;