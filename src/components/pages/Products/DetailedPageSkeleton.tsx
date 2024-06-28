import { Card, Skeleton, Row, Col, Divider, Descriptions, Rate } from "antd";

const DetailedPageSkeleton: React.FC = () => {
    return (
        <div className="skeleton-card-wrapper">
            <Card>
                <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                    <Col xs={24} sm={8} md={6} lg={4}>
                        <Skeleton.Image
                            style={{
                                minWidth: "100% !important",
                                height: "150px",
                                borderRadius: "8px",
                            }}
                        />
                    </Col>
                    <Col xs={24} sm={16} md={18} lg={20}>
                        <Skeleton.Input
                            style={{ width: "80%", marginBottom: "10px" }}
                            active
                        />
                        <div>
                            <Rate
                                disabled
                                defaultValue={0}
                                style={{ marginBottom: "10px" }}
                            />
                        </div>
                        <Skeleton.Input
                            style={{ width: "100%", marginBottom: "10px" }}
                            active
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Skeleton.Button active size="small" />
                            <Skeleton.Button active size="small" />
                            <Skeleton.Button active size="small" />
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left">Product Details</Divider>
                <Descriptions
                    column={{ xs: 1, sm: 2 }}
                    bordered
                    className="product-details"
                >
                    <Descriptions.Item label="Price">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Discount">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Stock">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Brand">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="SKU">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Weight">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Dimensions">
                        <Skeleton.Input active style={{ width: "200px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Warranty">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Availability">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Return Policy">
                        <Skeleton.Input active style={{ width: "200px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Minimum Order Quantity">
                        <Skeleton.Input active style={{ width: "100px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Barcode">
                        <Skeleton.Input active style={{ width: "200px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="QR Code">
                        <Skeleton.Image
                            style={{ width: "100px", height: "100px" }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        <Skeleton.Input active style={{ width: "150px" }} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        <Skeleton.Input active style={{ width: "150px" }} />
                    </Descriptions.Item>
                </Descriptions>
                <Divider orientation="left">Reviews</Divider>
                <div className="reviews-section">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="skeleton-review-item">
                            <Skeleton active avatar paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DetailedPageSkeleton;
