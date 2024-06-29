import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    Layout,
    Typography,
    message,
} from "antd";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

const { Text } = Typography;
const Login: React.FC = () => {
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem("360ict_token");

    // Redirect to home/dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    const onFinish = (values: {
        email: string;
        password: string;
        remember: boolean;
    }) => {
        const token = Math.random().toString(36).substring(2);

        // Store the token in local storage
        localStorage.setItem("360ict_token", token);
        message.success(`Login successful as ${values.email}`);
        navigate("/");
    };

    return (
        <Layout>
            <Flex
                style={{
                    height: "100vh",
                }}
                align="center"
                justify="center"
            >
                <Card title="Login with valid credentials">
                    <Form
                        name="normal_login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    required: true,
                                    message: "Please input your Email!",
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="forgot-password" href="#">
                                Forgot password?
                            </a>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: "0px" }}>
                            <Button block type="primary" htmlType="submit">
                                Log in
                            </Button>
                            <div className="footer">
                                <Text className="text">
                                    Don't have an account?
                                </Text>{" "}
                                <Link to="#">Sign up now</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </Layout>
    );
};

export default Login;
