import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {useHistory} from "react-router-dom";
import GeoModal from "../../components/GeoModal";

const Report = () => {
    const d = new Date();


    const [currentMonth, setCurrentMonth] = useState( d.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(d.getFullYear());
    const [data, setData] = useState([]);
    const [dataCoor, setDataCoor] = useState(null);
    const [isModalOpen, setisModalOpen] = useState(false);
    let history = useHistory();
    let day = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth();
    const onChange = (e) => {
        setCurrentYear(e)
        axios.post(API_PATH + "api/worker-attendance/", {
            'organization_id': localStorage.getItem("orgId"),
            'worker_id': localStorage.getItem("empid"),
            'year': e,
            'month': currentMonth,
            'token': localStorage.getItem("token")
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
            })

    }
    const onChangeMonth = (e) => {
        setCurrentMonth(e)
        axios.post(API_PATH + "api/worker-attendance/", {
            'organization_id': localStorage.getItem("orgId"),
            'worker_id': localStorage.getItem("empid"),
            'year': currentYear,
            'month': e,
            'token': localStorage.getItem("token")
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
            })

    }
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
            })
    }, [])
    return (
        <div className="report">
            <div className="drinks-header">
                <div className="d-flex align-items-center p-2">
                    <button className="back-white m-0" onClick={() => history.goBack()}>

                        <img src="/img/icon/backblack.png" alt=""/>
                    </button>
                    <h3 className="m-0"><span className="ml-10">Hisobotlar</span></h3>
                </div>
            </div>
            <div className="report-select w-100 overflow-x-hidden">
                <div className="row p-4 ">
                    <div className="col-6">
                        <Select value={currentYear} onChange={e => onChange(e)} className="w-100">
                            <Select.Option value={2025}>2025</Select.Option>
                            <Select.Option value={2024}>2024</Select.Option>
                            <Select.Option value={2023}>2023</Select.Option>
                            <Select.Option value={2022}>2022</Select.Option>
                            <Select.Option value={2021}>2021</Select.Option>
                        </Select>
                    </div>
                    <div className="col-6">
                        <Select value={currentMonth} onChange={e => onChangeMonth(e)} className="w-100">
                            <Select.Option value={1}>Yanvar</Select.Option>`
                            <Select.Option value={2}>Fevral</Select.Option>
                            <Select.Option value={3}>Mart</Select.Option>
                            <Select.Option value={4}>Aprel</Select.Option>
                            <Select.Option value={5}>May</Select.Option>
                            <Select.Option value={6}>Iyun</Select.Option>
                            <Select.Option value={7}>Iyul</Select.Option>
                            <Select.Option value={8}>Avgust</Select.Option>
                            <Select.Option value={9}>Sentyabr</Select.Option>
                            <Select.Option value={10}>Oktyabr</Select.Option>
                            <Select.Option value={11}>Noyabr</Select.Option>
                            <Select.Option value={12}>Dekabr</Select.Option>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="main-page-report">
                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col" className="th-bg">Sana</th>
                        <th scope="col" className="th-bg">Kelish</th>
                        <th scope="col" className="th-bg">Ketish</th>
                        <th scope="col" className="th-bg text-center">Ishlagan vaqti</th>
                        <th scope="col" className="text-center th-bg">Joy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.attendance?.map(item => (
                                <tr>
                                    <th scope="row">{Number(item?.date?.slice(8, 12))}</th>
                                    <td>{item?.first_entry?.time?.slice(11, 16)}</td>
                                    <td>{item?.last_exit?.time?.slice(11, 16)}</td>
                                    <td className="text-center">{item?.hours_worked}</td>
                                    <td className="text-center">
                                        <button className="btn bg-transparent" onClick={() => {
                                        setisModalOpen(true)
                                        setDataCoor(item?.first_entry?.location)
                                    }}>
                                        <EnvironmentOutlined />

                                    </button></td>
                                </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <GeoModal isModalOpen={isModalOpen} lat={41.305424916078096} lot={69.32604501931374} setisModalOpen={setisModalOpen}></GeoModal>
        </div>
    );
};

export default Report;