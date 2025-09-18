import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({
  isDark,
  isOnTop,
  toggleTheme,
}: {
  isDark: boolean;
  isOnTop: boolean;
  toggleTheme: () => void;
}) => (
  <button
    onClick={toggleTheme}
    className={`p-2 mt-1 rounded-full transition-colors duration-300 ${
      isOnTop ? "hover:bg-white/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    {isDark ? (
      <Sun className="h-5 w-5 text-yellow-400" />
    ) : (
      <Moon
        className={`h-5 w-5 ${
          isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
        }`}
      />
    )}
  </button>
);

export default ThemeToggle;