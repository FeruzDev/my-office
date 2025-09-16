import React, {useEffect, useState} from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import {PieChartOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {TOKEN_NAME} from "../../tools/constants";
import {getRoleName} from "../../tools/helper";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const AdminLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {t, i18n} = useTranslation();

    useEffect(() => {

    }, []);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const items = [
        {
            label: "O'zbekcha",
            key: 'uz',
        },
        {
            label: 'Русский',
            key: 'ru',
        },
        {
            label: 'English',
            key: 'en',
        },
    ];

    const handleMenuClick = (e) => {
        i18n.changeLanguage(e.key);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_NAME);
        setTimeout(() => {
            window.location.href = "/";
        }, 1000)
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="admin-slider">
                <div>
                    <div className="px-4">
                        <img src={"/assets/icons/logo-white-" + i18n.language + ".png"} alt="logo.png" className="w-100 my-4"/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <>
                            {props.user?.roles?.filter(item => item.name === "ROLE_ADMIN")?.length > 0 ?
                                <>
                                    {props.user.roles.length > 1 ? <p className="text-center my-4">Admin</p> : ""}
                                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                                        <Link to="/admin/dashboard" className="text-decoration-none">{t("dashboard")}</Link>
                                    </Menu.Item>
                                </> : ""
                            }
                        </>
                    </Menu>
                </div>
                {!collapsed ?
                    <div className="admin-user-info mt-5">
                        <h4><span className="icon icon-user me-1"/> {props.user?.firstName} {props.user?.lastName}</h4>
                        <p><span className="icon icon-portfel me-1"/>{props.user?.roles?.map(item => getRoleName(item.name, t)).join(", ")}</p>
                        <span><span className="icon icon-truck me-1"/> {props.user?.company?.name}</span>
                    </div> :
                    <div className="admin-collapsed-user-info mt-5">
                        <h4 className="text-center">NM</h4>
                    </div>
                }
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background d-flex align-items-center justify-content-end">
                    <Dropdown menu={menuProps} trigger={['click']}>
                        <button type="button" className="btn btn-language text-white"><span
                            className="icon icon-globe bg-white"/> {i18n.language === "uz" ? "O'zbekcha" : i18n.language === "ru" ? "Русский" : "English"}
                        </button>
                    </Dropdown>

                    <button type="button" className="btn" onClick={logout}><span className="icon icon-logout bg-white"/></button>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        {props.children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>HET Platform ©2025</Footer>
            </Layout>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, {})(AdminLayout);