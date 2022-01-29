import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import firebase from "firebase";
import React from "react";
import { auth } from "../firebase";

function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to UniChat</h2>
                <div
                    className="login-button google"
                    onClick={() =>
                        auth.signInWithPopup(
                            new firebase.auth.GoogleAuthProvider()
                        )
                    }
                >
                    <GoogleOutlined /> Sign In With Google
                </div>{" "}
                <br />
                <br />
                <div
                    className="login-button facebook"
                    onClick={() =>
                        auth.signInWithPopup(
                            new firebase.auth.FacebookAuthProvider()
                        )
                    }
                >
                    <FacebookOutlined /> Sign in with Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;
