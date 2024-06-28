import React, { ReactNode } from "react";
import { DashboardFilled, ProductFilled } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "dashboard",
        icon: React.createElement(DashboardFilled),
        label: `Dashboard`,
    },
    {
        key: "products",
        icon: React.createElement(ProductFilled),
        label: `Products`,
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
