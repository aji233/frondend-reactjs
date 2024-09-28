import AxiosInstance from '../lib/axios-instance';

export const fetchData = async (search = '') => {
    const url = search.length > 0 ? `product?search=${search}` : 'product';

    try {
        const response = await AxiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error('Fetch Data Error:', error.response?.data || error.message);
        throw error;
    }
}

export const createData = async (newProduct) => {
    try {
      const response = await AxiosInstance.post('product', newProduct);
      return response.data;
    } catch (error) {
      console.error('Create Data Error:', error.response?.data || error.message);
      throw error;
    }
  };
  
  export const updateData = async (id, updatedProduct) => {
    try {
      const response = await AxiosInstance.put(`product?id=${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      console.error('Update Data Error:', error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteData = async (id) => {
    try {
      const response = await AxiosInstance.delete(`product?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete Data Error:', error.response?.data || error.message);
      throw error;
    }
  };