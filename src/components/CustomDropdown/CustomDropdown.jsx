import { useEffect, useState } from "react";
import { Earth, Users } from "lucide-react";
import "./CustomDropdown.css"

const CustomDropdown = ({setDropselect}) => {
  const [selected, setSelected] = useState("public");

  useEffect(()=>{
    if(selected === 'public'){
        setDropselect("public")
    }else{
        setDropselect("Followers")
    }
  },[selected])

  return (
    <div className="custom-dropdown">
      <button className="dropdown-btn">
        {selected === "public" ? <Earth  size={18}/> : <Users  size={18}/>}
        {selected === "public" ? " Public" : " Followers"}
      </button>
      <div className="dropdown-menu">
        <div onClick={() => setSelected("public")}>
          <Earth size={18} /> Public
        </div>
        <div onClick={() => setSelected("followers")}>
          <Users size={18} /> Followers
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown