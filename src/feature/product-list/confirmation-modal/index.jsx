import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../redux/slices/productSlice';

const ConfrimationModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  
  const onDelete = () => {
    dispatch(deleteProduct(id));

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 p-6 rounded shadow-lg w-1/2 relative">
        <h2 className="text-2xl mb-4 font-semibold"><ins>Apakah Kamu Yakin Menghapus data ini ?</ins></h2>
        <div className="flex justify-end">
          <div className="flex gap-x-4">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500" 
            onClick={onClose}>
              Tidak
            </button>
            <button
              onClick={() => onDelete()}
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Ya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfrimationModal;

