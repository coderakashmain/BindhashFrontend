import { useEffect, useState } from "react";

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
        backgroundColor: "var(--buttoncolor)",
        color: "var(--textcolor)",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  )
}

export default ThemeSwitcher

