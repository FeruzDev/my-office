import React, {useEffect, useState} from 'react';
import {Button, InputNumber, Select} from "antd";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../tools/constants";
import {EnvironmentOutlined} from "@ant-design/icons";

const Catering = () => {
    const d = new Date();

    const [data, setData] = useState([]); // Initialize count to 0
    const [dataHis, setDataHis] = useState([]); // Initialize count to 0
    const [objects, setObjects] = useState([]); // Initialize count to 0
    const [objectsUn, setObjectsUn] = useState([]); // Initialize count to 0
    const [selectObject, setSelectObject] = useState(null); // Initialize count to 0
    const [selectFood, setSelectFood] = useState(null); // Initialize count to 0
    const [selectObjectUn, setSelectObjectUn] = useState(null); // Initialize count to 0

    const [currentMonth, setCurrentMonth] = useState( d.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(d.getFullYear());
    let history = useHistory();

    const onChangeMonth = (e) => {
        setCurrentMonth(e)

    }
    const onChange = () => {

    }
    const sendData = () => {
        axios.post(API_PATH + "api/employee-obyekt-select/", {
            "select": selectFood,
            "obyekt": selectObject,
            'employee': Number(localStorage.getItem("empid")),

        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                history.goBack()
            })
    }
    const getHistory = () => {
        axios.post(API_PATH + "employee-obyekt-select/history/" , {
            "user_id": Number(localStorage.getItem("empid")),

        })
            .then(res => {
                setDataHis(res.data?.results);
            })
            .catch(err => console.log(err));
    }
    const getObjects = (e, name) => {
        axios.get(API_PATH + "api/obyects/mini/?organization_id=" + Number(localStorage.getItem("orgId")) + (e ? "&bolim=" + e : "") + (name ? "&q=" + name : ""))
            .then(res => {
                setObjects(res.data?.results);
                console.log(res?.data?.results);
            })
            .catch(err => console.log(err));
    }
    const getObjectsUn = () => {
        axios.get(API_PATH + "api/obyects/mini/?organization_id=" + Number(localStorage.getItem("orgId")))
            .then(res => {
                setObjectsUn(res.data?.uniq_bolimlar);
            })
            .catch(err => console.log(err));
    }
    useEffect(() =>{

        getObjectsUn()
        getHistory()
        getObjects()
    }, [])
    return (
        <div>
            <div className="drinks-header">
                <div className="d-flex align-items-center p-2">
                    <button className="back-white m-0" onClick={() => history.goBack()}>

                        <img src="/img/icon/backblack.png" alt=""/>
                    </button>
                    <h3 className="m-0"><span className="ml-10">Buyurtma</span></h3>
                </div>
            </div>
            <div className="w-100 p-2 d-flex align-items-center prtkw-input">
                    <div className="col-12">
                        <Select
                            allowClear
                            onChange={e => {
                            getObjects(e)
                            setSelectObjectUn(e)
                        }} className="w-100">
                            {
                                objectsUn?.map((item, index) => (
                                    <Select.Option value={item?.id}>{item?.name}</Select.Option>

                                ))
                            }
                        </Select>
                    </div>
            </div>
            <div className="w-100 p-2 d-flex align-items-center mt-3 prtkw-input2">
                    <div className="col-12">
                        <Select onSearch={(e) => getObjects(selectObjectUn, e)}
                                showSearch

                                filterOption={false}
                                onChange={e => setSelectObject(e)} className="w-100">
                            {
                                objects?.map((item, index) => (
                                    <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </div>
            </div>
            <div className="w-100 p-2 d-flex align-items-center mt-3 prtkw-input2">
                    <div className="col-12">
                        <Select

                                filterOption={false}
                                onChange={e => setSelectFood(e)} className="w-100">

                                    <Select.Option value="ABET">Tushlik</Select.Option>
                                    <Select.Option value="KECHKI">Kechki ovqat</Select.Option>

                        </Select>
                    </div>
            </div>

            <div className="w-100 p-2">
                <button className="btn btn-primary w-100 p-2" onClick={sendData}>
                    Buyurtma berish
                </button>
            </div>



            <div className="main-page-report mt-5">

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

                <table className="table table-borderless">
                    <thead>
                    <tr>
                        <th scope="col" className="th-bg">Sana</th>
                        <th scope="col" className="th-bg">Vaqt</th>
                        <th scope="col" className="th-bg">Tashkilot</th>
                        <th scope="col" className="th-bg">Holati</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dataHis?.results?.map(item => (
                            <tr>
                                <th scope="row" className="text-nowrap">{item?.date?.slice(0, 10)}</th>
                                <th scope="row">{item?.date?.slice(11, 16)}</th>
                                <td>{item?.organization}</td>
                                <td>{item?.status_label}</td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Catering;