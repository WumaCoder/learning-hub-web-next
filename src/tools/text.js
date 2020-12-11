export const textTemplate = (template = "*", text = "") => {
  if (typeof text === "object") {
    return text;
  }
  return template.replace(/\*/gim, text);
};
