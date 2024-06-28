// src/components/Products.tsx
import React from "react";
import { Table, Pagination, Button, Skeleton } from "antd";
import { ColumnsType } from "antd/es/table";
import { useGetProductsQuery } from "../../../lib/store/features/products/productApi";
import { Product } from "../../../../types/product";
import { EyeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
const Products: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);

    const { data, isLoading, error } = useGetProductsQuery({
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
    });

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const columns: ColumnsType<Product> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            responsive: ["md"],
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            responsive: ["md"],
        },
        {
            title: "Action",
            key: "action",
            render: (_: unknown, record: Product) => (
                <Link to={`/product/${record.id}`}>
                    <Button
                        type="primary"
                        icon={<EyeFilled />}
                        size={"middle"}
                    />
                </Link>
            ),
        },
    ];
    const skeletonColumns = columns.map((col) => ({
        ...col,
        render: () => <Skeleton.Input style={{ width: "100%" }} active />,
    }));

    return (
        <div style={{ padding: "0 16px" }}>
            <Table
                dataSource={
                    isLoading ? Array(pageSize).fill({}) : data?.products || []
                }
                columns={isLoading ? skeletonColumns : columns}
                pagination={false}
                rowKey="id"
                scroll={{ x: "max-content" }}
            />
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "16px",
                }}
            >
                {!isLoading && (
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={data?.total || 0}
                        onChange={handlePageChange}
                        onShowSizeChange={handlePageChange}
                        showSizeChanger
                    />
                )}
            </div>
            {error && <p>Error fetching products: {error.toString()}</p>}
        </div>
    );
};

export default Products;
