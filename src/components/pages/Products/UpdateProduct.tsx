import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Rate,
    message,
    Row,
    Col,
    InputNumber,
    Upload,
    Radio,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UploadFile } from "antd/es/upload/interface";
import {
    useGetProductDetailsQuery,
    usePatchProductMutation,
} from "../../../lib/store/features/products/productApi";
import { Category, Product } from "../../../types/product";

const UpdateProduct: React.FC = () => {
    const { productId } = useParams();
    const [form] = useForm();
    const [categories, setCategories] = useState<Category[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [qrCodeOption, setQrCodeOption] = useState<string>("url");
    const [qrCodeFileList, setQrCodeFileList] = useState<UploadFile[]>([]);

    const {
        data: product,

        error: productError,
    } = useGetProductDetailsQuery(productId, {
        skip: !productId,
        refetchOnMountOrArgChange: true,
    });

    const [patchProduct, { isError, error: patchError }] =
        usePatchProductMutation();

    useEffect(() => {
        fetchCategories();
        if (product) {
            form.setFieldsValue(product);
            setFileList(
                product.images.map((url: string, index: number) => ({
                    uid: String(index),
                    name: `Image ${index + 1}`,
                    status: "done",
                    url,
                }))
            );
            if (product.meta.qrCode.startsWith("http")) {
                setQrCodeOption("url");
                setQrCodeFileList([]);
            } else {
                setQrCodeOption("file");
                setQrCodeFileList([
                    {
                        uid: "-1",
                        name: "QR Code",
                        status: "done",
                        url: product.meta.qrCode,
                    },
                ]);
            }
        }
    }, [product]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(
                "https://dummyjson.com/products/categories"
            );
            setCategories(data);
        } catch (error) {
            message.error("Error fetching categories");
            console.error("Error fetching categories:", error);
        }
    };

    const handleFinish = async (values: Product) => {
        const formData = {
            ...values,
            id: productId,
            meta: {
                ...values.meta,
                qrCode:
                    qrCodeOption === "url"
                        ? values.meta.qrCode
                        : qrCodeFileList.length > 0
                        ? qrCodeFileList[0].url
                        : "",
            },
        };
        try {
            await patchProduct(formData).unwrap();
            message.success("Product updated successfully!");
        } catch (error) {
            message.error("Failed to update product");
            console.error("Error updating product:", error);
        }
    };

    if (productError) {
        message.error("Failed to fetch product details");
        console.error("Error fetching product details:", productError);
    }

    if (isError && patchError) {
        message.error("Failed to update product");
        console.error("Error updating product:", patchError);
    }

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList);
    };

    const handleQrCodeUploadChange = ({
        fileList,
    }: {
        fileList: UploadFile[];
    }) => {
        setQrCodeFileList(fileList);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={product}
            style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the product title",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "Please select a category",
                            },
                        ]}
                    >
                        <Select>
                            {categories.map((category: Category) => (
                                <Select.Option
                                    key={category?.slug}
                                    value={category?.slug}
                                >
                                    {category?.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the price",
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            step={0.01}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Discount Percentage"
                        name="discountPercentage"
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            step={0.01}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Rating" name="rating">
                        <Rate allowHalf />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Stock"
                        name="stock"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the stock quantity",
                            },
                        ]}
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item label="Tags" name="tags">
                        <Select mode="tags" placeholder="Enter tags">
                            {product?.tags.map((tag: string) => (
                                <Select.Option key={tag} value={tag}>
                                    {tag}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Brand" name="brand">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="SKU" name="sku">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item label="Weight (kg)" name="weight">
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xs={24}>
                    <Form.Item label="Dimensions">
                        <Row gutter={8}>
                            <Col span={8}>
                                <Form.Item
                                    name={["dimensions", "width"]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder="Width"
                                        min={0}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["dimensions", "height"]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder="Height"
                                        min={0}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={["dimensions", "depth"]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder="Depth"
                                        min={0}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Warranty Information"
                        name="warrantyInformation"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Shipping Information"
                        name="shippingInformation"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Availability Status"
                        name="availabilityStatus"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item label="Return Policy" name="returnPolicy">
                        <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Minimum Order Quantity"
                        name="minimumOrderQuantity"
                    >
                        <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item label="Barcode" name={["meta", "barcode"]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Form.Item label="QR Code">
                        <Radio.Group
                            onChange={(e) => setQrCodeOption(e.target.value)}
                            value={qrCodeOption}
                        >
                            <Radio value="url">URL</Radio>
                            <Radio value="file">File</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                {qrCodeOption === "url" ? (
                    <Col xs={24} md={16}>
                        <Form.Item
                            label="QR Code URL"
                            name={["meta", "qrCode"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please provide a QR Code URL",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                ) : (
                    <Col xs={24} md={16}>
                        <Form.Item
                            label="QR Code File"
                            rules={[
                                {
                                    required: true,
                                    message: "Please upload a QR Code file",
                                },
                            ]}
                        >
                            <Upload
                                fileList={qrCodeFileList}
                                onChange={handleQrCodeUploadChange}
                                listType="picture-card"
                                beforeUpload={() => false} // Prevent automatic upload
                            >
                                <Button icon={<UploadOutlined />}></Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row gutter={24}>
                <Col xs={24}>
                    <Form.Item label="Images">
                        <Upload
                            fileList={fileList}
                            onChange={handleUploadChange}
                            listType="picture-card"
                            beforeUpload={() => false} // Prevent automatic upload
                        >
                            <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24}>
                    <Form.List name="reviews">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Row key={field.key} gutter={8}>
                                        <Col span={8}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "rating"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "rating",
                                                ]}
                                            >
                                                <Rate allowHalf />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, "comment"]}
                                                fieldKey={[
                                                    field.fieldKey,
                                                    "comment",
                                                ]}
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
                                                onClick={() =>
                                                    remove(field.name)
                                                }
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
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProduct;
