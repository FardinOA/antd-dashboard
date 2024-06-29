import React, { ReactNode } from "react";
import {
    DashboardFilled,
    ProductFilled,
    PlusSquareFilled,
    OrderedListOutlined,
    UserOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Dropdown,
    Flex,
    Layout,
    Menu,
    Typography,
    theme,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
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
const dropDownItems = [
    {
        key: "Profile",
        icon: React.createElement(ProductFilled),
        label: <Link to="/profile">Profile</Link>,
    },

    {
        label: "Logout",
        key: "SubMenu",
        icon: React.createElement(ProductFilled),
    },
];

const breadcrumbLinks: Record<string, string> = {
    "/": "Dashboard",
    "/products": "Products",
    "/add-product": "Add Product",
    "/profile": "Profile",
};

const App = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const pathSnippets = location.pathname.split("/").filter((i) => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbLinks[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    return (
        <Layout
            style={{
                overflow: "hidden",
            }}
        >
            <Sider
                style={{
                    background: "#fff",
                }}
                defaultCollapsed
                breakpoint="lg"
                collapsedWidth="0"
            >
                <Title
                    style={{
                        textAlign: "center",
                        marginTop: "0",
                    }}
                >
                    360
                    <span
                        style={{
                            color: "tomato",
                        }}
                    >
                        ICT
                    </span>
                </Title>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: "0 16px",
                        background: colorBgContainer,
                    }}
                >
                    <Flex align="center" justify="space-between">
                        <Flex align="center">
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate(-1)}
                                style={{ marginRight: "16px" }}
                            />
                            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                        </Flex>
                        <Dropdown
                            menu={{ items: dropDownItems }}
                            placement="bottomRight"
                            arrow
                        >
                            <UserOutlined
                                style={{ fontSize: "20px", cursor: "pointer" }}
                            />
                        </Dropdown>
                    </Flex>
                </Header>
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
