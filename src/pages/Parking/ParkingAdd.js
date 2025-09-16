import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";

const ParkingAdd = () => {
    const [data, setData] = useState({});
    let history = useHistory();

    const addCar = () => {
      axios.post("http://10.10.100.200/my_office", data)
          .then((res) => {
              console.log(res);
          })
    }
    useEffect(() => {
        setData({
            ...data,
            mode: "add",
            my_office_user_id: Number(localStorage.getItem("empid")),
        });
    }, [])
    return (
        <div className="parking-style">
            <div className="drinks-header w-100">
                <div className="d-flex align-items-center  w-100">
                    <button className="back-white ml-10" onClick={() => history.goBack()}>

                        <img src="/img/icon/backblack.png" alt=""/>
                    </button>
                    <h3 className="m-0 p-0 w-100 d-flex justify-content-between align-items-center p-3"><span>Avtomobil qo'shish</span></h3>
                </div>
            </div>
            <div className="parking-style-items-add p-4">
                <label>Avtomobil rusumi</label>
                <input onChange={(e) => setData({...data, name: e.target.value })} type="text" className="form-control"/>
                <label className="mt-4">Avtomobil raqami</label>
                <input onChange={(e) => setData({...data, carnum: e.target.value })} type="text" className="form-control"/>
                <button className="btn btn-primary w-100 mt-3" onClick={addCar}>Qo'shish</button>
            </div>
        </div>
    );
};

export default ParkingAdd;