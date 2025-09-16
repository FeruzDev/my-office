import React, {useEffect, useState} from 'react';
import {Select} from "antd";
import {EnvironmentOutlined} from "@ant-design/icons";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {useHistory} from "react-router-dom";

const Kitchen = () => {
    const d = new Date();

    let history = useHistory();
    const [currentMonth, setCurrentMonth] = useState( d.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(d.getFullYear());
    const [data, setData] = useState([]);

    let day = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth();

    var firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
    var lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);


    function getMonthStartAndEndDate(year, month) {

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Day 0 of next month is the last day of current month

        // Function to format date as YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() is 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        return {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        };
    }

// Example usage:
    const now = new Date();
    const currentYear2 = now.getFullYear();
    const currentMonth2 = now.getMonth() + 1; // Add 1 because getMonth() is 0-indexed

    const dates = getMonthStartAndEndDate(currentYear, currentMonth);
    console.log("Start Date:", dates.startDate);
    console.log("End Date:", dates.endDate);


    const onChange = (e) => {
        setCurrentYear(e)
        axios.get(API_PATH + "api/kitchen/employee-history/?employee_id=" + Number(localStorage.getItem("empid"))  + "&year=" + e + "&month=" + currentMonth + "&order=desc", {
            'organization_id': localStorage.getItem("orgId"),
            "period": {
                'type': "month",
                "start":  getMonthStartAndEndDate(e, currentMonth)?.startDate,
                "end":  getMonthStartAndEndDate(e, currentMonth)?.endDate,
            }
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
            })
            .catch(err => {

            })

    }
    const onChangeMonth = (e) => {
        setCurrentMonth(e)
        getMonthStartAndEndDate(currentYear, e);
        axios.get(API_PATH + "api/kitchen/employee-history/?employee_id=" + Number(localStorage.getItem("empid")) + "&year=" + currentYear + "&month=" + e + "&order=desc", {
            'organization_id': localStorage.getItem("orgId"),

            "period": {
                'type': "month",
                "start": dates.startDate,
                "end": dates.endDate,
            }
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
            })
            .catch(err => {

            })

    }
    useEffect(() => {
        axios.get(API_PATH + "api/kitchen/employee-history/?employee_id=" + Number(localStorage.getItem("empid")),{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);
            })
            .catch(err => {

            })
    }, [])
    return (
        <div className="report">
            <div className="drinks-header">
                <div className="d-flex align-items-center p-2">
                    <button className="back-white m-0" onClick={() => history.goBack()}>

                        <img src="/img/icon/backblack.png" alt=""/>
                    </button>
                    <h3 className="m-0"><span className="ml-10">Oshxona hisobotlari</span></h3>
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
                        <th scope="col" className="th-bg">Foto</th>
                        <th scope="col" className="th-bg">Sana</th>
                        <th scope="col" className="th-bg">Vaqt</th>
                        <th scope="col" className="text-center th-bg">Joy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.days?.map(item => (
                            <tr>
                                <td className='p-2' scope="row"><img className="w-100" src={"http://84.54.118.39:8444/media/media_uploads/" + item?.photo} alt=""/></td>
                                <td className="text-center text-nowrap">{item?.date}</td>
                                <td className="text-center text-nowrap">{item?.time}</td>
                                <td className="text-center text-nowrap">{item?.object_name}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Kitchen;