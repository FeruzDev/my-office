import React, { useState, useRef } from 'react';
import  './style.css';
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {API_PATH} from "../../tools/constants";
import {toast} from "react-toastify";

const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState({});
    const [tab, setTab] = useState(true);
    let history = useHistory();

    const { t } = useTranslation();


    const handleSubmit = (e) => {
        axios.post(API_PATH + "select-phone/", {"phone": phone})
            .then((response) => {
               setCode(response?.data);
               localStorage.setItem("token", response.data.token);
               localStorage.setItem("empid", response.data.employee_id);
               localStorage.setItem("org", response.data.organization_name);
               localStorage.setItem("orgId", response.data.organization_id);
               setTab(false)

            })
            .catch((error) => {
                toast.error("Xatolik sodir bo'ldi");
            })
    }
    const handleSubmitCode = (e) => {
        axios.post(API_PATH + "check-phone-sms/", {"code": code?.code, "token": code.token, "phone": phone})
            .then((response) => {
                history.push("/main");
            })
            .catch((error) => {
                toast.error("Xatolik sodir bo'ldi");
            })
    }

    return (
        <div className="login-container-big">
            <div className="login-container">
                <div className="login-form">
                    <h2>Login</h2>

                    {
                        tab
                        ?
                            <div>
                                <div className="input-group-me">
                                    <label htmlFor="phone">Telefon raqam:</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        required
                                        onChange={(e) => {setPhone(e.target.value)}}
                                    />
                                </div>
                                <button  onClick={handleSubmit} type="submit" className="login-btn" style={{borderRadius: "18px", color: "white"}}>Login</button>

                            </div>

                            :
                            <div>
                                <div className="input-group-me">
                                    <label htmlFor="phone">Kod:</label>
                                    <input
                                        type="text"
                                        id="code"
                                        required
                                        value={code?.code}
                                        onChange={(e) => {setCode(e.target.value)}}
                                    />
                                </div>
                                <button  onClick={handleSubmitCode} type="submit" className="login-btn" style={{borderRadius: "18px", color: "white"}}>Kirish</button>

                            </div>

                    }

                </div>
            </div>
        </div>

    );
};

export default LoginForm;
