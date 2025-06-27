import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// Add new product
export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/products/get`
    );
    return response?.data;
  }
);

// Edit product
export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
