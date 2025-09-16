import React from 'react';
import {useHistory} from "react-router-dom";

const Drinks = () => {
    let history = useHistory();
    return (
        <div className="Drinks">
            <div className="drinks-header">
                <div className="row">
                    <div className="col-2">
                        <button className="back-white" onClick={() => history.goBack()}>

                        <img src="/img/icon/backwhite.png" alt=""/>
                    </button>
                    </div>
                    <div className="col-8">
                        <h3>Xush kelibsiz</h3>
                        <p>Feruz Jalilov</p>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <div className="drinks-content">
               <div className="row w-100 p-0 m-0">
                   {/*<div className="col-6">*/}
                   {/*    <button>*/}
                   {/*        <img src="/img/ich1.png" alt="..."/>*/}
                   {/*        <span> Salqin ichimliklar</span>*/}
                   {/*    </button>*/}
                   {/*</div>*/}
                   <div className="col-6">
                       <button onClick={() => history.push("/main/drinks/cofe")}>
                           <img className="w-50" src="/img/img.png" alt="..."/>
                           <span> Cofe</span>
                       </button>
                   </div>
                   <div className="col-6">
                       <button onClick={() => history.push("/main/drinks/kitchen-report")}>
                           <img src="/img/report.png" alt="..."/>
                           <span>Oshxona hisoboti</span>
                       </button>
                   </div>
               </div>
                <div className="row w-100 mt-3  p-0 m-0">

                    {/*<div className="col-6">*/}
                    {/*    <button>*/}
                    {/*        <img src="/img/ich4.png" alt="..."/>*/}
                    {/*        <span>Suv</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Drinks;