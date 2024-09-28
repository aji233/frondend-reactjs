import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../../redux/slices/productSlice';

const FormModal = ({ isOpen, onClose, data }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    category: '',
    price: '',
    discount: '',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setFormData({
        product_name: data.product_name || '',
        category: data.category || '',
        price: data.price || '',
        discount: data.discount || '',
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.product_name) {
      toast.warn('Nama Product is required!', { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!formData.category) {
      toast.warn('Category is required!', { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!formData.price) {
      toast.warn('Price is required!', { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!formData.discount) {
      toast.warn('Discount is required!', { position: "top-right", autoClose: 3000 });
      return;
    }
    

    if (data) {
      const updatedFormData = {
        ...formData,
        price: parseInt(formData.price, 10)
      };
      dispatch(updateProduct({ id: data.id, updatedProduct: updatedFormData }));
    } else {
      dispatch(createProduct(formData));
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 p-6 rounded shadow-lg w-1/2 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4 font-semibold"><ins>Form Product</ins></h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name-product" className="block text-gray-700 font-bold mb-2">
              Nama Product
            </label>
            <input
              type="text"
              id="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nama Product"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Category"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Price"
            />

            <div className="mb-4">
              <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">
                Discount
              </label>
              <input
                type="number"
                id="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan Discount"
              />
            </div>

            <div className="flex justify-between">
              <button  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={onClose}>
                  Kembali
              </button>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;

