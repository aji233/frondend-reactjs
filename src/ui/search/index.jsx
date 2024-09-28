import React from 'react'
import { IoIosSearch } from "react-icons/io";

const SeacrhUi = ({ setValueName, valueName }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 border rounded-l focus:outline-none"
        value={valueName}
        onChange={(e) => setValueName(e.target.value)}
      />
      <button className="px-4 py-3 bg-blue-500 text-white rounded-r hover:bg-blue-600">
      <IoIosSearch className='text-xl'/>
      </button>
    </div>
  )
}

export default SeacrhUi