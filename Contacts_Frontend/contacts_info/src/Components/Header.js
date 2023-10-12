import React from "react";
import { logout } from "../Slices/AuthSlice";
import { useDispatch } from "react-redux";

function Header(props) {
  const dispatch=useDispatch();

  const handleLogout=()=>{
    dispatch(logout());
  }
  return (
    <div>
      <div className="bg-[#FFEB62] h-15 flex justify-between items-center px-8">
        <div className="text-[22px] font-semibold">Contact App</div>
        <div>
          <button className="p-5" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
