import React from 'react';
import {RotatingLines} from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="main-loader-wrap">
            <RotatingLines
                strokeColor="#0079F1"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loader;
