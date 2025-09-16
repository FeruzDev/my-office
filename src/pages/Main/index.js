import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import {BarsOutlined, CarOutlined, CoffeeOutlined, EnvironmentOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../tools/constants";
import GeoModal from "../../components/GeoModal";

const Main = () => {
    let history = useHistory();
    const d = new Date();
    const [dataCoor, setDataCoor] = useState(null);

    const [data, setData] = useState({});
    const [dataAt, setDataAt] = useState([]);
    const [isModalOpen, setisModalOpen] = useState(false);


    const [currentMonth, setCurrentMonth] = useState( d.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(d.getFullYear());

    useEffect(() => {
        axios.post(API_PATH + "api/worker-attendance/", {
            'organization_id': localStorage.getItem("orgId"),
            'worker_id': localStorage.getItem("empid"),
            'year': currentYear,
            'month': currentMonth,
            'token': localStorage.getItem("token")
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
                setDataAt(res.data?.attendance);
            })
    }, [])
    return (
        <div className="main-page">

            <div className="main-page-header d-flex align-items-center justify-content-space-between w-100">

               <div>
                   <h2>{data?.worker?.first_name + " " +  data?.worker?.last_name}</h2>
                   <h4>{localStorage?.getItem("org")}</h4>
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
                        <th>  {dataAt && dataAt[dataAt?.length - 1]?.hours_worked }</th>

                        <td>  {dataAt && dataAt[dataAt?.length - 1]?.first_entry?.time?.slice(11-16)   }</td>
                        <td>  {dataAt && dataAt[dataAt?.length - 1]?.last_exit?.time?.slice(11-16)   }</td>

                        <td className="text-center">
                            <button className="btn bg-transparent" onClick={() => {
                                setisModalOpen(true)
                            }}>
                                <EnvironmentOutlined />

                            </button></td>
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
            <GeoModal isModalOpen={isModalOpen} lat={41.305424916078096} lot={69.32604501931374} setisModalOpen={setisModalOpen}></GeoModal>

        </div>
    );
};

export default Main;