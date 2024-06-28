import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../../lib/store/features/products/productApi";
import {
    Card,
    Descriptions,
    Image,
    Tag,
    List,
    Rate,
    Typography,
    Row,
    Col,
} from "antd";
import DetailedPageSkeleton from "./DetailedPageSkeleton";
import { Review } from "../../../types/product";
const { Title } = Typography;
const ProductDetails = () => {
    const { productId } = useParams(); // Access product ID from URL params

    const {
        data: product,
        isFetching,
        error,
    } = useGetProductDetailsQuery(productId, {
        skip: !productId,

        refetchOnMountOrArgChange: true,
    });

    if (isFetching) return <DetailedPageSkeleton />;
    if (error) return <p>Error fetching product: {error.toString()}</p>;

    if (!product) return <p>Product not found.</p>; // Handle missing product

    console.log(product);

    return (
        <div>
            <Card>
                <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                    <Col xs={24} sm={8} md={6} lg={4}>
                        <Image
                            width="100%"
                            src={product.thumbnail}
                            alt={product.title}
                        />
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={20}>
                        <Title level={2}>{product.title}</Title>
                        <Rate
                            disabled
                            defaultValue={product.rating}
                            style={{ marginBottom: "10px" }}
                        />
                        <p>{product.description}</p>
                        <div>
                            {product.tags.map((tag: string) => (
                                <Tag key={tag} color="blue">
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Descriptions
                    title="Product Details"
                    bordered
                    column={{ xs: 1, sm: 2 }}
                >
                    <Descriptions.Item label="Price">
                        ${product.price.toFixed(2)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Discount">
                        {product.discountPercentage}%
                    </Descriptions.Item>
                    <Descriptions.Item label="Stock">
                        {product.stock}
                    </Descriptions.Item>
                    <Descriptions.Item label="Brand">
                        {product.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="SKU">
                        {product.sku}
                    </Descriptions.Item>
                    <Descriptions.Item label="Weight">
                        {product.weight}g
                    </Descriptions.Item>
                    <Descriptions.Item label="Dimensions">
                        {product.dimensions.width} x {product.dimensions.height}{" "}
                        x {product.dimensions.depth} cm
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                        {product.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Warranty">
                        {product.warrantyInformation}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping">
                        {product.shippingInformation}
                    </Descriptions.Item>
                    <Descriptions.Item label="Availability">
                        {product.availabilityStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Return Policy">
                        {product.returnPolicy}
                    </Descriptions.Item>
                    <Descriptions.Item label="Minimum Order">
                        {product.minimumOrderQuantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="Barcode">
                        {product.meta.barcode}
                    </Descriptions.Item>
                    <Descriptions.Item label="QR Code">
                        <Image width={100} src={product.meta.qrCode} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {new Date(product.meta.createdAt).toLocaleString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {new Date(product.meta.updatedAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: "20px" }}>
                    <Title level={3}>Reviews</Title>
                    <List
                        itemLayout="vertical"
                        dataSource={product.reviews}
                        renderItem={(review: Review) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`${review.reviewerName} - ${review.rating} stars`}
                                    description={new Date(
                                        review.date
                                    ).toLocaleString()}
                                />
                                <p>{review.comment}</p>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ProductDetails;
