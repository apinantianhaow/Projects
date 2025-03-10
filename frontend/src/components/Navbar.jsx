import React from "react"

function Navbar() {
    
    return (
        <navbar className="bg-white w-full h-20 flex justify-between items-center px-4">
        <input
          type="text"
          placeholder="Type to search"
          className="w-48 px-4 py-2 border-none rounded-md"
        />
        <div className="flex gap-4">
          <button className="w-48 h-8 bg-gray-300 rounded-md">Sign in</button>
          <button className="w-48 h-8 bg-gray-900 text-white rounded-md">Register</button>
        </div>
      </navbar>
    )
}

export default Navbar
