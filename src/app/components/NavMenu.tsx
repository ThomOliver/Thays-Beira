import React from "react";

interface NavItem {
  label: string;
  href: string;
}

interface NavMenuProps {
  navItems: NavItem[];
  pathname: string;
  handleLinkClick: (href: string) => void;
  isOnTop: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({
  navItems,
  pathname,
  handleLinkClick,
  isOnTop,
}) => (
  <nav className="hidden md:flex items-center gap-4">
    {navItems.map((item, idx) => {
      const isActive = pathname === item.href;
      return (
        <div key={item.href} className="flex items-center gap-3 relative">
          <button
            onClick={() => handleLinkClick(item.href)}
            className={`relative text-base font-medium tracking-wide transition-colors duration-300 ${
              isOnTop
                ? isActive
                  ? "text-primary"
                  : "text-white hover:text-primary"
                : isActive
                ? "text-primary"
                : "text-gray-700 dark:text-gray-300 hover:text-primary"
            }`}
          >
            {item.label}
            {isActive && (
              <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-primary rounded-full"></span>
            )}
          </button>
          {idx < navItems.length - 1 && (
            <span
              className={`text-lg select-none pl-1 ${
                isOnTop
                  ? "text-white"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              |
            </span>
          )}
        </div>
      );
    })}
  </nav>
);
NavMenu.displayName = "NavMenu";

export default React.memo(NavMenu);