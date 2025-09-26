export const getFieldByLang = (item: any, field: string, language?: string) => {
  const lang = (language || "pt").split("-")[0];
  const fieldByLang = `${field}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
  return item[fieldByLang] || item[field] || "";
};
