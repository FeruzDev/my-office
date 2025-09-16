import React, {useEffect, useState} from 'react';
import {Button, InputNumber, Select} from "antd";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {API_PATH} from "../../tools/constants";
import {EnvironmentOutlined} from "@ant-design/icons";

const Cofee = () => {
    const [count, setCount] = useState(1); // Initialize count to 0
    const [selectType, setSeleectType] = useState(null); // Initialize count to 0
    const [selectTitle, setSeleectTitle] = useState(""); // Initialize count to 0
    const [data, setData] = useState([]); // Initialize count to 0
    const [dataHis, setDataHis] = useState([]); // Initialize count to 0

    let history = useHistory();
    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    const handleCountChange = (value) => {
        setCount(value);
    };
    
    const onChange = () => {
      
    }
    const sendData = () => {
            axios.post(API_PATH + "order-coffe-lady/", {
                'organization_id': Number(localStorage.getItem("orgId")),
                'user_id': Number(localStorage.getItem("empid")),
                'coffe_ladies': [{
                        "name": selectType,
                        "count": count,
                        "description": selectTitle
                }],
            },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
                .then(res => {
                     history.goBack()
                })
    }
    useEffect(() =>{
        axios.post(API_PATH + "coffe-lady-list/",{
            'organization_id': Number(localStorage.getItem("orgId")),


            'token': localStorage.getItem("token")
        },{headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
            .then(res => {
                setData(res.data);

            })



        axios.get(API_PATH + "coffee/orders/history/?organization_id=" + Number(localStorage.getItem("orgId"))+  "&user_id=" +  Number(localStorage.getItem("empid")))
            .then(res => {
                console.log(res.data);
                setDataHis(res.data);
            })
            .catch(err => console.log(err));
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
                <Button onClick={handleDecrement}>-</Button>
                <InputNumber
                    value={count}
                    className="text-center w-100 d-flex align-items-center justify-content-center"
                    onChange={handleCountChange}
                    style={{ margin: '0 10px', width: 60 }} // Inline styles for spacing and width
                    min={0} // Optional: Set a minimum value
                />
                <Button onClick={handleIncrement}>+</Button>
            </div>
            <div className="w-100 p-2">
                <Select onChange={(e) => setSeleectType(e)} defaultValue={selectType} className="w-100">
                    {
                        data?.result?.map(item => (
                            <Select.Option value={item?.id}>{item?.name}</Select.Option>

                        ))
                    }
                </Select>
            </div>
            <div className="w-100 p-2">
                <textarea name="nim" onChange={(e) => setSeleectTitle(e.target.value)} id="" className="form-control" style={{height: "220px"}}></textarea>
            </div>
            <div className="w-100 p-2">
                <button className="btn btn-primary w-100 p-2" onClick={sendData}>
                    Buyurtma berish
                </button>
            </div>



            <div className="main-page-report mt-5">
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

export default Cofee;