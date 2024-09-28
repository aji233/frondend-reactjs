import FormModal from './form-modal';
import SeacrhUi from '../../ui/search';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import ConfrimationModal from './confirmation-modal';

const ProductList = () => {

  const [valueSearch, setValueSeacrh] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts(valueSearch)); 
  }, [ dispatch, valueSearch]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const onDelete = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  
  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  
  const closeConfirmationModal = () => {
    setSelectedId(null);
    setIsDeleteModalOpen(false);
  };


  return (
    <>
    <FormModal isOpen={isEditModalOpen} onClose={closeEditModal} data={selectedProduct} />
    <FormModal isOpen={isModalOpen} onClose={closeModal}/>
    <ConfrimationModal isOpen={isDeleteModalOpen} onClose={closeConfirmationModal} id={selectedId} />
    <div className="mx-4 my-8 rounded overflow-hidden shadow-lg bg-white">
      <div className="p-4 text-bold text-2xl font-semibold">List Product</div>
      <div className="flex justify-between items-center m-4">
        <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create
        </button>
        <SeacrhUi setValueName={setValueSeacrh} valueName={valueSearch} />
      </div>
      <div className="overflow-x-auto mx-4 mb-20">
        <table className="min-w-full text-left text-sm font-light my-4">
          <thead className="border-b bg-red-400 font-medium text-white">
            <tr>
              <th scope="col" className="px-6 py-4">Nama Product</th>
              <th scope="col" className="px-6 py-4">Category</th>
              <th scope="col" className="px-6 py-4">Price</th>
              <th scope="col" className="px-6 py-4">Discount</th>
              <th scope="col" className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{product.product_name}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.category}</td>
                <td className="whitespace-nowrap px-6 py-4">Rp. {product.price}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.discount}%</td>
                <td className="px-6 py-4">
                  <button onClick={() => onEdit(product)} className=" bg-yellow-300 mr-2 p-2 rounded">Edit</button>
                  <button onClick={() => onDelete(product.id)} className=" bg-red-400 mr-2 p-2 rounded">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  )
}

export default ProductList