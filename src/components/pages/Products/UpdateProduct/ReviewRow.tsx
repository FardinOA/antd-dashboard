import { Button, Col, Form, Input, Rate, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ReviewRow: React.FC = () => {
    return (
        <Row gutter={24}>
            <Col xs={24}>
                <Form.List name="reviews">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Row key={index} gutter={8}>
                                    <Col span={8}>
                                        <Form.Item
                                            name={[field.name, "rating"]}
                                            key={`${field.key}-rating`}
                                        >
                                            <Rate allowHalf />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name={[field.name, "comment"]}
                                            key={`${field.key}-comment`}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please enter a comment",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Review comment" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            type="link"
                                            danger
                                            onClick={() => remove(field.name)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add Review
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Col>
        </Row>
    );
};

export default ReviewRow;
