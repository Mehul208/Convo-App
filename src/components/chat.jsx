import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
function Chats() {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const handleLogout = async () => {
        await auth.signOut();
        history.push("/");
    };
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: "images/jpeg" });
    };
    useEffect(() => {
        if (!user) {
            history.push("/");
            return;
        }
        axios
            .get("https://api.chatengine.io/users/me", {
                headers: {
                    projectID: process.env.REACT_APP_CHAT_ENGINE_ID,
                    "user-name": user.email,
                    "user-secret": user.uid,
                },
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("username", user.email);
                formdata.append("secret", user.uid);

                getFile(user.photoURL).then((avatar) => {
                    formdata.append("avatar", avatar, avatar.name);
                    axios
                        .post("https://api.chatengine.io/users/", formdata, {
                            headers: {
                                "private-key":
                                    process.env.REACT_APP_CHAT_ENGINE_KEY,
                            },
                        })
                        .then(() => setLoading(false))
                        .catch((err) => console.log(err));
                });
            });
    }, [user, history]);
    if (!user || loading) return "Loading";
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Convo</div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;
