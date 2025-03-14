import { useState } from "react";

function DesiredItemsSelector({ selectedDesiredItem, setSelectedDesiredItem, closeModal }) {
  const [tempDesiredItem, setTempDesiredItem] = useState(selectedDesiredItem);
  const categories = ["Electronics", "Clothing", "Books", "Home", "Plants", "Art&Handmade", "Collectibles", "Sports", "Kids", "Beauty", "Grocery"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md w-96">
        <h3 className="font-bold text-lg mb-2">Desired Items category</h3>

        {/* ตัวเลือกสินค้าที่ต้องการ */}
        {categories.map((item, index) => (
          <div key={index} className="p-2 cursor-pointer flex items-center" onClick={() => setTempDesiredItem(item)}>
            <input type="radio" checked={tempDesiredItem === item} readOnly className="mr-2" />
            {item}
          </div>
        ))}

        <button 
          className="w-full bg-[#AC631F] hover:bg-opacity-80 text-white p-2 rounded-md mt-4" 
          onClick={() => { 
            setSelectedDesiredItem(tempDesiredItem); 
            closeModal(); 
          }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default DesiredItemsSelector;
