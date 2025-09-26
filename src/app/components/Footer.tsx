"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          {t("DevelopedBy")}:{" "}
          <Link
            href="https://olibet.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Olibet Technology
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
