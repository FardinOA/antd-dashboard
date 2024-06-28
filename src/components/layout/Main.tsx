import React, { ReactNode } from "react";
import {
    DashboardFilled,
    ProductFilled,
    PlusSquareFilled,
    OrderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "dashboard",
        icon: React.createElement(DashboardFilled),
        label: <Link to="/">Dashboard</Link>,
    },

    {
        label: "Products",
        key: "SubMenu",
        icon: React.createElement(ProductFilled),
        children: [
            {
                key: "product-list",
                icon: React.createElement(OrderedListOutlined),
                label: <Link to="/products">List</Link>,
            },
            {
                key: "add-product",
                icon: React.createElement(PlusSquareFilled),
                label: <Link to="/add-product">Add Product</Link>,
            },
        ],
    },
];

const App = ({ children }: { children: ReactNode }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content
                    style={{
                        margin: "24px 16px 0",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: `100vh`,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
