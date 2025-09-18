import React from "react";

export type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  url?: string | null;
  label: string;
  hoverColor?: string; 
};

interface SocialLinksProps {
  links: SocialLink[];
  isOnTop?: boolean;
  showSeparator?: boolean;
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  isOnTop = false,
  showSeparator = false,
  className = "",
}) => (
  <div className={`flex items-center gap-3 ${className}`}>
    {links.map(
      (social, i) =>
        social.url && (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            aria-label={social.label}
            className={`transition-colors duration-300 ${
              isOnTop
                ? "text-white hover:opacity-80"
                : "text-gray-700 dark:text-gray-300 hover:text-primary"
            } ${social.hoverColor ?? ""}`}
          >
            <social.icon className="w-5 h-5" />
          </a>
        )
    )}
    {showSeparator && (
      <span
        className={`text-lg select-none pl-1 ${
          isOnTop ? "text-white" : "text-gray-400 dark:text-gray-600"
        }`}
      >
        |
      </span>
    )}
  </div>
);

export default React.memo(SocialLinks);
