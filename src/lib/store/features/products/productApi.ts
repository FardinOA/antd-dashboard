import { Product } from "../../../../types/product";
import { apiSlice } from "../apiSlice";
import { setProductDetail } from "./productSlice";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
export const productApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query<
            ProductsResponse,
            { limit?: number; skip?: number }
        >({
            query: ({ limit = 10, skip = 0 }) =>
                `products?limit=${limit}&skip=${skip}`,
        }),

        getProductDetails: build.query<Product, number>({
            query: (id: number) => `products/${id}`,
        }),

        patchProduct: build.mutation<
            Product,
            { id: number; data: Partial<Product> }
        >({
            query: ({ id, ...data }) => ({
                url: `products/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    usePatchProductMutation,
} = productApi;
