import React from 'react';
import {useHistory} from "react-router-dom";

const Parking = () => {
    let history = useHistory();
    return (
        <div className="parking-style">
            <div className="drinks-header w-100">
                <div className="d-flex align-items-center  w-100">
                    <button className="back-white ml-10" onClick={() => history.goBack()}>

                        <img src="/img/icon/backblack.png" alt=""/>
                    </button>
                    <h3 className="m-0 p-0 w-100 d-flex justify-content-between align-items-center p-3"><span>Avtoturargoh</span> <button className="btn btn-primary " onClick={() => history.push("/main/parking/add")} style={{marginLeft: "auto"}}>+</button></h3>
                </div>
            </div>
            <div className="row w-100">
                <div className="col-12 w-100">
                    <div className="parking-style-items">
                        <div className="parking-style-items-num">
                            01 | H 773 OA
                        </div>
                        <div className="row mt-3">
                            <div className="col-6"><button className="uz-btn">O'zgartirish</button></div>
                            <div className="col-6"><button className="uc-btn">O'chirish</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parking;