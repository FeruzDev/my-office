import React from 'react';
import {Table} from "antd";
import {BarsOutlined, CarOutlined, CoffeeOutlined, EnvironmentOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const Main = () => {
    let history = useHistory();
    return (
        <div className="main-page">

            <div className="main-page-header d-flex align-items-center justify-content-space-between w-100">

               <div>
                   <h2>Jalilov Feruz</h2>
                   <h4>Burgut soft</h4>
               </div>
                <div style={{ marginLeft: "auto"}}>
                    <button onClick={() => {
                        history.push("/")
                        localStorage.clear()
                    }} style={{ background: "transparent", padding: "10px", border: "none"}}>
                        <img src="/img/icon/exit.png" alt="..."/>
                    </button>
                </div>

            </div>
            <div className="main-page-table">
                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col" className="th-bg">Bugun</th>
                        <th scope="col" className="th-bg">Kelish</th>
                        <th scope="col" className="th-bg">Ketish</th>
                        <th scope="col" className="text-center th-bg">Joy</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">08:20</th>
                        <td>09:00</td>
                        <td>18:00</td>
                        <td className="text-center"><EnvironmentOutlined /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="main-page-content">
                <div className="row">
                    <div className="col-6 p-2">
                        <div className="main-box-btn main-box-btn-cl-1">
                            <button disabled onClick={() => history.push("main/keldiketdi")}>
                                <UserSwitchOutlined />
                              <span>
                                    Keldi ketdi
                              </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-6 p-2">
                        <div className="main-box-btn main-box-btn-cl-2">
                            <button onClick={() => history.push("main/report")}>
                                <BarsOutlined />
                                <span>
                                    Hisobotlar
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-6 p-2">
                        <div className="main-box-btn main-box-btn-cl-3">
                            <button onClick={() => history.push("main/drinks")}>
                                <CoffeeOutlined />
                                <span>
                                    Oshxona
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-6 p-2">
                        <div className="main-box-btn main-box-btn-cl-4">
                            <button onClick={() => history.push("main/parking")}>
                                <CarOutlined />
                                <span>
                                    Avtoturargoh
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;