import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle({
  darkMode,
  setDarkMode,
}) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="
        flex
        items-center
        gap-3
        px-5
        py-3
        rounded-2xl
        shadow-lg
        bg-white
        hover:scale-105
        transition
        dark:bg-slate-800
        dark:text-white
      "
    >
      {darkMode ? (
        <>
          <FaSun className="text-yellow-400 text-xl" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <FaMoon className="text-slate-700 text-xl" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}