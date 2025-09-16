// import React from 'react';
// import {BrowserRouter, Route, Switch} from "react-router-dom";
// import Home from "./pages/home";
// import Login from "./pages/login";
// import AdminDashboard from "./pages/admin/dashboard";
// import {Toaster} from "react-hot-toast";
// import Loader from "./components/Loader";
//
// const App = (props) => {
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route exact path="/" component={Home}/>
//                 <Route exact path="/auth/login" component={Login}/>
//                 {/*<PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} role="admin"/>*/}
//
//             </Switch>
//             <Toaster position="bottom-center"/>
//             {props.isLoading ?
//                 <Loader/> : ""
//             }
//         </BrowserRouter>
//     );
// };
//
//
// export default App;


import {BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import React, {useEffect} from "react";
import LoginForm from "./pages/login";
import Home from "./pages/home";
const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("token");

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                    window.location.replace("/login")
                )
            }
        />
    );
};

function App() {
    let history = useHistory();
    useEffect(() => {
        if (window.location.pathname === "/" && localStorage.getItem("token")) {
            history?.push('/main');
        } else {
            history?.push('/login');
        }
    }, []);
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={LoginForm} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;


