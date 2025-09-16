import React from 'react';
import {Link} from "react-router-dom";

const NotFound = (props) => {
    return (
        <div className="my-5 text-center">
            404
            <Link to='/'>Orqaga Qaytish</Link>
        </div>
    );
};

export default NotFound;