import { Menu } from "lucide-react";

const MobileMenuButton = ({
  toggleMenu,
  isOnTop,
}: {
  toggleMenu: () => void;
  isOnTop: boolean;
}) => (
  <button
    onClick={toggleMenu}
    className={`p-2 rounded-full transition-colors duration-300 ${
      isOnTop ? "hover:bg-white/20" : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }`}
  >
    <Menu
      className={`h-5 w-5 ${
        isOnTop ? "text-white" : "text-gray-700 dark:text-gray-300"
      }`}
    />
  </button>
);

export default MobileMenuButton;