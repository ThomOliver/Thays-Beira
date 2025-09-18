import { Instagram, Facebook, Twitter, Linkedin, Music2 } from "lucide-react";
import { SocialLink } from "@/app/components/SocialLinks";

interface Artist {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  xtwitter?: string;
  linkedin?: string;
}

export function mapArtistToSocialLinks(artist?: Artist | null): SocialLink[] {
  if (!artist) return [];

  return [
    artist.instagram && {
      icon: Instagram,
      url: artist.instagram,
      label: "Instagram",
      hoverColor: "hover:text-pink-400",
    },
    artist.facebook && {
      icon: Facebook,
      url: artist.facebook,
      label: "Facebook",
      hoverColor: "hover:text-blue-500",
    },
    artist.tiktok && {
      icon: Music2,
      url: artist.tiktok,
      label: "TikTok",
      hoverColor: "hover:text-gray-200",
    },
    artist.xtwitter && {
      icon: Twitter,
      url: artist.xtwitter,
      label: "Twitter / X",
      hoverColor: "hover:text-black dark:hover:text-white",
    },
    artist.linkedin && {
      icon: Linkedin,
      url: artist.linkedin,
      label: "LinkedIn",
      hoverColor: "hover:text-blue-600",
    },
  ].filter(Boolean) as SocialLink[];
}
