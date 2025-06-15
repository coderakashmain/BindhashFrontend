import { useEffect, useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
const  ThemeSwitcher = ()=> {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        backgroundColor: "",
        color: "var(--textcolor)",
        padding: "8px 0px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? <LightModeRoundedIcon/> : <DarkModeIcon />}
    </button>
  )
}

export default ThemeSwitcher

