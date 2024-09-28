import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createData, updateData, deleteData } from '../../services/ProductServise';
import { toast } from 'react-toastify';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (search) => {  
  const response = await fetchData(search);
  return response.data;
});

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (newProduct, { dispatch, rejectWithValue }) => {
    try {
      const response = await createData(newProduct);
      if (response.success) { 
        toast.success('Data berhasil disimpan', { position: "top-right", autoClose: 3000 });
      }
      dispatch(fetchProducts());
      return response.data;
    } catch (error) {
      console.error('Create Product Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct', 
  async ({ id, updatedProduct }, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateData(id, updatedProduct);
      if (response.success) { 
        toast.success('Data berhasil diubah', { position: "top-right", autoClose: 3000 });
      }
      dispatch(fetchProducts());
      return response.data;
    } catch (error) {
      console.error('Update Product Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct', 
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await deleteData(id);
      if (response.success) { 
        toast.success('Data berhasil diHapus', { position: "top-right", autoClose: 3000 });
      }
      dispatch(fetchProducts());
      return response.data;
    } catch (error) {
      console.error('hapus Product Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload); 
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          const index = state.items.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        } else {
          console.error('Update Product fulfilled without a valid payload');
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
