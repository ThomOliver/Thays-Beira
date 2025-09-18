import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Music2,
} from "lucide-react";

interface Artist {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  xtwitter?: string;
  linkedin?: string;
  profilePic?: string;
  name?: string;
}

interface SocialIconsProps {
  artist?: Artist | null;
  isOnTop: boolean;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ artist, isOnTop }) => (
  <div className="hidden md:flex items-center space-x-4">
    {artist?.instagram && (
      <a
        href={artist.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-pink-400"
            : "text-gray-700 dark:text-gray-300 hover:text-pink-400"
        }`}
      >
        <Instagram className="w-5 h-5" />
      </a>
    )}
    {artist?.facebook && (
      <a
        href={artist.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-blue-500"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
        }`}
      >
        <Facebook className="w-5 h-5" />
      </a>
    )}
    {artist?.tiktok && (
      <a
        href={artist.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-gray-200"
            : "text-gray-700 dark:text-gray-300 hover:text-gray-200"
        }`}
      >
        <Music2 className="w-5 h-5" />
      </a>
    )}
    {artist?.xtwitter && (
      <a
        href={artist.xtwitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-black dark:hover:text-white"
            : "text-gray-700 dark:text-gray-300 hover:text-black"
        }`}
      >
        <Twitter className="w-5 h-5" />
      </a>
    )}
    {artist?.linkedin && (
      <a
        href={artist.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-colors duration-300 ${
          isOnTop
            ? "text-white hover:text-blue-600"
            : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
        }`}
      >
        <Linkedin className="w-5 h-5" />
      </a>
    )}
    <span
      className={`text-lg select-none pl-1 ${
        isOnTop ? "text-white" : "text-gray-400 dark:text-gray-600"
      }`}
    >
      |
    </span>
  </div>
);
SocialIcons.displayName = "SocialIcons";

export default SocialIcons;