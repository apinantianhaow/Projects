import React, { createContext, useState, useContext } from "react";

// สร้าง context สำหรับการค้นหา
const SearchContext = createContext();

// Hook ใช้ในการเข้าถึง context
export const useSearch = () => useContext(SearchContext);

// SearchProvider สำหรับการจัดการ searchTerm
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // เก็บค่า searchTerm

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
