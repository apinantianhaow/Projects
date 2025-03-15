import { useState } from "react";

function ConditionSelector({ selectedCondition, setSelectedCondition, closeModal }) {
  const [tempCondition, setTempCondition] = useState(selectedCondition);
  const conditions = [
    { label: "Like New", color: "text-green-600" },
    { label: "Good", color: "text-yellow-500" },
    { label: "Poor", color: "text-red-600" }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
        <h3 className="font-bold text-lg mb-4">Condition</h3>
        
        {conditions.map((condition, index) => (
          <label 
            key={index} 
            className="p-2 flex items-center cursor-pointer space-x-2"
          >
            <input 
              type="radio" 
              name="condition" 
              value={condition.label}
              checked={tempCondition === condition.label} 
              onChange={() => setTempCondition(condition.label)}
              className="mr-2"
            />
            <span className={`font-medium ${condition.color}`}>{condition.label}</span>
          </label>
        ))}

        <button 
          className="w-full bg-[#AC631F] hover:bg-opacity-80 text-white p-2 rounded-md mt-4" 
          onClick={() => { 
            setSelectedCondition(tempCondition); 
            closeModal(); 
          }}>
          Save
        </button>
      </div>
    </div>
  );
}

export default ConditionSelector;
