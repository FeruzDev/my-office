import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import "antd/dist/reset.css"
import "./styles/global.scss";
import "./i18n";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";



const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
    </QueryClientProvider>
    // ,
    // document.getElementById('root')
);
