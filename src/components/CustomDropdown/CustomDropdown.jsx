import { useEffect, useState } from "react";
import { Earth, Users } from "lucide-react";
import "./CustomDropdown.css"

const CustomDropdown = ({setDropselect}) => {
  const [selected, setSelected] = useState("public");

  useEffect(()=>{
    if(selected === 'public'){
        setDropselect("public")
    }else{
        setDropselect("anonymous")
    }
  },[selected])

  return (
    <div className="custom-dropdown">
      <button className="dropdown-btn" disabled>
        {selected === "public" ? <Earth  size={18}/> : <Users  size={18}/>}
        {selected === "public" ? " public" : " Anonymous"}
      </button>
      <div className="dropdown-menu">
        <div onClick={(e) => {
          e.preventDefault();
          
          setSelected("public")}
          }>
          <Earth size={18} /> Public
        </div>
        <div onClick={(e) => {
               e.preventDefault();
          setSelected("anonymous")}}>
          <Users size={18} /> Anonymous
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown