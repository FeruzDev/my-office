import React from 'react';
import {Route} from "react-router-dom";
import Main from "../Main";
import Report from "../Report";
import KeldiKetdi from "../KeldiKetdi";
import Drinks from "../drinks";
import Cofee from "../drinks/Cofee";
import Kitchen from "../Kitchen";
import Parking from "../Parking";
import ParkingAdd from "../Parking/ParkingAdd";

const Home = () => {
    return (
        <div>
            <Route path="/main" exact component={Main} />
            <Route path="/main/report" exact component={Report} />
            <Route path="/main/keldiketdi" exact component={KeldiKetdi} />
            <Route path="/main/drinks" exact component={Drinks} />
            <Route path="/main/parking" exact component={Parking} />
            <Route path="/main/parking/add" exact component={ParkingAdd} />
            <Route path="/main/drinks/cofe" exact component={Cofee} />
            <Route path="/main/drinks/kitchen-report" exact component={Kitchen} />
        </div>
    );
};

export default Home;