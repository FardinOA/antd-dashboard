import { Product } from "../../../../types/product";
import { apiSlice } from "../apiSlice";
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

        getProductDetails: build.query<Product, number | undefined>({
            query: (id?: number | undefined) => `products/${id}`,
        }),

        patchProduct: build.mutation<
            Product,
            { id: number; data: Partial<Product> }
        >({
            query: ({ id, data }) => ({
                url: `products/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
});

// custom type the hook exports
export const useGetProductsQuery: typeof productApi.endpoints.getProducts.useQuery =
    productApi.endpoints.getProducts.useQuery;
export const useGetProductDetailsQuery: typeof productApi.endpoints.getProductDetails.useQuery =
    productApi.endpoints.getProductDetails.useQuery;
export const usePatchProductMutation: typeof productApi.endpoints.patchProduct.useMutation =
    productApi.endpoints.patchProduct.useMutation;
