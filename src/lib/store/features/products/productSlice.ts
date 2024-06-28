import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productDetails: null,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductDetail: (state, action) => {
            state.productDetails = action.payload;
        },
        clearDetails: (state) => {
            state.productDetails = null;
        },
    },
});

export const { setProductDetail, clearDetails } = productSlice.actions;

export default productSlice.reducer;
